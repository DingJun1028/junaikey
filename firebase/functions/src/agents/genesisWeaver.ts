import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * The GenesisWeaver agent is responsible for creating new blueprints in the system.
 * It's a callable function that can be invoked from the frontend.
 */
export const genesisWeaver = functions.region('asia-east1').https.onCall(async (data, context) => {
    // Ensure the user is authenticated.
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'The function must be called while authenticated.'
        );
    }

    const { blueprintName, initialData } = data;

    // Validate input data
    if (!blueprintName || typeof blueprintName !== 'string' || !initialData) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'The function must be called with a "blueprintName" string and an "initialData" object.'
        );
    }

    const db = admin.firestore();

    try {
        // Execute the "Genesis Command" to create the blueprint document.
        await db.collection('blueprints').doc(blueprintName).set(initialData);

        // Trigger the "Eternal Engraving" event card for auditing and downstream processing.
        const eventCard = {
            type: 'blueprint_created',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            triggeredBy: context.auth.uid,
            payload: { blueprintName }
        };
        await db.collection('eventCards').add(eventCard);

        return { status: 'success', message: `Blueprint '${blueprintName}' created successfully.` };
    } catch (error) {
        // In case of an error, we could trigger a "Chaos Purification" event.
        // For now, we just log the error and return a failure status.
        console.error("Error in genesisWeaver:", error);
        throw new functions.https.HttpsError(
            'internal',
            'An error occurred while creating the blueprint.'
        );
    }
});
