import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK.
// This is done once per server instance.
admin.initializeApp();

// Export all agents and triggers from their respective files.
// This keeps the main entry point clean and organized.

// Agents (callable functions)
export * from './agents/genesisWeaver';

// Triggers (background functions)
export * from './triggers/cardTriggers';
