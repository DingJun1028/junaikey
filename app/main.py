import os
from contextlib import asynccontextmanager
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, Field
from dotenv import load_dotenv

import firebase_admin
from firebase_admin import credentials, firestore

# It's good practice to load environment variables at the start.
load_dotenv()

from tensorzero import AsyncTensorZeroGateway

# --- Pydantic Models ---

class AskRequest(BaseModel):
    question: str = Field(..., description="The question to ask the philosophical guide.", example="What is the meaning of life?")

class AskResponse(BaseModel):
    answer: str = Field(..., description="The philosophical guidance from the AI.", example="The meaning of life is a deeply personal question...")
    inference_id: str = Field(..., description="The unique ID for this inference call.")

class UserBase(BaseModel):
    email: str = Field(..., example="philosopher@example.com")
    philosophyLevel: int = Field(..., example=1)
    elementAffinities: Dict[str, Any] = Field(..., example={"water": 0.8, "fire": 0.2})
    subscriptionTier: str = Field(..., example="premium")

class UserCreate(UserBase):
    pass

class User(UserBase):
    userId: str = Field(..., example="user-12345")

class CardBase(BaseModel):
    name: str = Field(..., example="The Thinker")
    type: str = Field(..., example="Virtue")
    rarity: str = Field(..., example="Legendary")
    elements: List[str] = Field(..., example=["logic", "reason"])
    description: str = Field(..., example="A card representing deep contemplation.")

class CardCreate(CardBase):
    pass

class Card(CardBase):
    cardId: str = Field(..., example="card-abcde")


# --- Lifespan Management for Services ---

tensorzero_client = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # This code runs on startup.
    global tensorzero_client, db

    # Initialize Firebase Admin SDK
    try:
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred, {
            'projectId': os.getenv('GCP_PROJECT_ID'),
        })
        db = firestore.client()
        print("Firebase Admin SDK initialized successfully.")
    except Exception as e:
        print(f"ERROR: Failed to initialize Firebase Admin SDK: {e}")
        # Not raising an exception to allow the app to run, but Firestore endpoints will fail.

    # Initialize TensorZero Gateway
    clickhouse_url = os.getenv("TENSORZERO_CLICKHOUSE_URL")
    if not clickhouse_url or not os.getenv("OPENAI_API_KEY"):
        print("WARNING: TENSORZERO_CLICKHOUSE_URL or OPENAI_API_KEY is not set. The /api/v1/ask endpoint will not be available.")
    else:
        tensorzero_client = await AsyncTensorZeroGateway.build_embedded(
            clickhouse_url=clickhouse_url,
            config_file="config/tensorzero.toml",
        )

    yield

    # This code runs on shutdown.
    if tensorzero_client:
        await tensorzero_client.close()
    # Firebase admin doesn't require an explicit close.


# --- FastAPI Application ---

app = FastAPI(
    title="JunAiKey API",
    description="API for the Universal Philosophical Matrix System, powered by TensorZero and Firebase.",
    version="0.1.0",
    lifespan=lifespan
)

# --- Health and Root Endpoints ---

@app.get("/")
async def read_root():
    return {"message": "Welcome to the JunAiKey API"}

@app.get("/health")
async def health_check():
    return {"status": "ok", "services": {"tensorzero": "available" if tensorzero_client else "unavailable", "firestore": "available" if db else "unavailable"}}

# --- TensorZero AI Endpoint ---

@app.post("/api/v1/ask", response_model=AskResponse)
async def ask_philosophical_question(request: AskRequest):
    if not tensorzero_client:
        raise HTTPException(status_code=503, detail="TensorZero Gateway is not available. Check server configuration.")
    try:
        response = await tensorzero_client.inference(function_name="philosophical_guidance", input={"messages": [{"role": "user", "content": request.question}]})
        answer_text = response.content[0].text if response.content and hasattr(response.content[0], 'text') else ""
        return AskResponse(answer=answer_text, inference_id=str(response.inference_id))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred with the AI service: {e}")

# --- Firestore User Endpoints ---

@app.post("/api/v1/users", response_model=User, status_code=201)
async def create_user(user: UserCreate):
    if not db: raise HTTPException(status_code=503, detail="Firestore is not available.")
    try:
        # Firestore can auto-generate an ID
        doc_ref = db.collection('users').document()
        doc_ref.set(user.model_dump())
        return User(userId=doc_ref.id, **user.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {e}")

@app.get("/api/v1/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    if not db: raise HTTPException(status_code=503, detail="Firestore is not available.")
    try:
        doc_ref = db.collection('users').document(user_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="User not found")
        return User(userId=doc.id, **doc.to_dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve user: {e}")

# --- Firestore Card Endpoints ---

@app.post("/api/v1/cards", response_model=Card, status_code=201)
async def create_card(card: CardCreate):
    if not db: raise HTTPException(status_code=503, detail="Firestore is not available.")
    try:
        doc_ref = db.collection('cards').document()
        doc_ref.set(card.model_dump())
        return Card(cardId=doc_ref.id, **card.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create card: {e}")

@app.get("/api/v1/cards/{card_id}", response_model=Card)
async def get_card(card_id: str):
    if not db: raise HTTPException(status_code=503, detail="Firestore is not available.")
    try:
        doc_ref = db.collection('cards').document(card_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Card not found")
        return Card(cardId=doc.id, **doc.to_dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve card: {e}")
