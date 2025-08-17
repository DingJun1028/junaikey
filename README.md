# JunAiKey - Universal Philosophical Matrix System

JunAiKey is a FastAPI-based API for a Universal Philosophical Matrix System. It provides AI-powered philosophical guidance and personalized analysis for users. The system leverages Firebase for data storage and the TensorZero AI Gateway for its intelligent features.

## Features

- **Philosophical Guidance**: Ask deep philosophical questions and receive AI-generated guidance.
- **User Profiles**: Store user data, including their philosophical level and element affinities, in Firestore.
- **Card System**: A system for philosophical cards, also stored in Firestore.
- **Jules's Personalized Analysis**: A new feature that provides a personalized philosophical analysis for a user based on their profile data.

## API Endpoints

### Health Check

- `GET /health`: Checks the status of the API and its connected services (Firestore, TensorZero).

### AI Endpoints

- `POST /api/v1/ask`: Ask a philosophical question.
  - **Request Body**: `{"question": "What is the meaning of life?"}`
  - **Response**: An answer from the AI.

- `POST /api/v1/users/{user_id}/jules-analysis`: Get a personalized analysis from Jules.
  - **Request Body**: `{}`
  - **Response**: A personalized analysis based on the user's profile.

### User Management

- `POST /api/v1/users`: Create a new user.
- `GET /api/v1/users/{user_id}`: Retrieve a user's details.

### Card Management

- `POST /api/v1/cards`: Create a new card.
- `GET /api/v1/cards/{card_id}`: Retrieve a card's details.

## Running the Application

1.  **Set up Environment Variables**:
    - Create a `.env` file from the `.env.example`.
    - Fill in the required values for `GCP_PROJECT_ID`, `TENSORZERO_CLICKHOUSE_URL`, and `OPENAI_API_KEY`.

2.  **Install Dependencies**:
    ```bash
    pip install -r app/requirements.txt
    ```

3.  **Run the Server**:
    ```bash
    uvicorn app.main:app --reload
    ```

The API will be available at `http://1227.0.0.1:8000`.
