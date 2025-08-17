import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock, AsyncMock

# This import assumes your FastAPI app instance is named 'app' in 'app.main'
from app.main import app, lifespan

# Create a TestClient instance
client = TestClient(app)

# --- Mocks for External Services ---

# Mock Firebase Firestore
mock_db = MagicMock()
mock_user_doc = MagicMock()
mock_user_doc.exists = True
mock_user_doc.to_dict.return_value = {
    "email": "jules@example.com",
    "philosophyLevel": 5,
    "elementAffinities": {"reason": 0.9, "passion": 0.1},
    "subscriptionTier": "premium",
}
mock_db.collection.return_value.document.return_value.get.return_value = mock_user_doc

# Mock TensorZero Gateway
mock_tz_response = MagicMock()
mock_tz_response.content = [MagicMock()]
mock_tz_response.content[0].text = "A profound analysis of your philosophical leanings."
mock_tz_response.inference_id = "inf_12345"

mock_tensorzero_client = AsyncMock()
mock_tensorzero_client.inference = AsyncMock(return_value=mock_tz_response)


# --- Test Cases ---

@pytest.mark.asyncio
async def test_jules_analysis_endpoint_success():
    """
    Tests the happy path for the /api/v1/users/{user_id}/jules-analysis endpoint.
    """
    user_id = "test-user-id"

    # Use patch to replace the actual clients during the test
    with patch('app.main.db', mock_db), \
         patch('app.main.tensorzero_client', mock_tensorzero_client):

        response = client.post(f"/api/v1/users/{user_id}/jules-analysis", json={})

        # Assertions
        assert response.status_code == 200
        data = response.json()
        assert data["analysis"] == "A profound analysis of your philosophical leanings."
        assert "inference_id" in data

        # Verify that the external services were called correctly
        mock_db.collection.assert_called_with('users')
        mock_db.collection('users').document.assert_called_with(user_id)
        mock_tensorzero_client.inference.assert_called_once()
        call_args = mock_tensorzero_client.inference.call_args
        assert call_args.kwargs['function_name'] == 'jules_analysis'


@pytest.mark.asyncio
async def test_jules_analysis_user_not_found():
    """
    Tests the case where the user is not found in Firestore.
    """
    user_id = "non-existent-user"
    mock_user_doc_not_found = MagicMock()
    mock_user_doc_not_found.exists = False
    mock_db_not_found = MagicMock()
    mock_db_not_found.collection.return_value.document.return_value.get.return_value = mock_user_doc_not_found

    with patch('app.main.db', mock_db_not_found), \
         patch('app.main.tensorzero_client', mock_tensorzero_client):
        response = client.post(f"/api/v1/users/{user_id}/jules-analysis", json={})
        assert response.status_code == 404
        assert response.json()['detail'] == "User not found"
