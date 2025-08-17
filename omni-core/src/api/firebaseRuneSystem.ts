import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { initializeApp } from "firebase/app";

// --- Firebase Configuration ---
// IMPORTANT: This configuration should be moved to a separate, non-committed file
// and loaded via environment variables for production.
// For this blueprint, we will keep it here for simplicity.
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// --- Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, 'asia-east1'); // Match the region of your functions

// --- Emulator Connection (for local development) ---
// This block connects to the local Firebase Emulator Suite if the Vite
// development server is running.
if (import.meta.env.DEV) {
  console.log("Connecting to Firebase Emulator...");
  connectFunctionsEmulator(functions, "localhost", 5001);
}


/**
 * The Rune System is the bridge to all backend logic.
 * It calls the callable Cloud Functions (our "Agents").
 * @param agentName The name of the agent (Cloud Function) to call.
 * @param payload The data to send to the agent.
 * @returns The result from the agent.
 */
export const callAgent = async (agentName: string, payload: any) => {
    try {
        const callable = httpsCallable(functions, agentName);
        const result = await callable(payload);
        return result.data;
    } catch (error) {
        // Log the error for debugging and re-throw it or handle it as needed.
        console.error(`Error calling agent "${agentName}":`, error);
        throw error;
    }
};
