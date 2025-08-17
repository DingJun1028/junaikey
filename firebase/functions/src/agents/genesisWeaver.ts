import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Ensure firebase-admin is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}

export const genesisWeaver = functions.https.onCall(async (data, context) => {
  // We can add authentication checks here later
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  // }

  const { blueprintName, initialData } = data;
  const db = admin.firestore();

  if (!blueprintName || !initialData) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with "blueprintName" and "initialData" arguments.');
  }

  try {
    // Execute the creation instruction
    functions.logger.info(`Creating blueprint: ${blueprintName}`, {structuredData: true});
    await db.collection("blueprints").doc(blueprintName).set(initialData);

    // Trigger an event card for auditing/logging
    const eventCard = {
      type: "blueprint_created",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      payload: { blueprintName },
      // createdBy: context.auth.uid // Example of using auth info
    };
    await db.collection("eventCards").add(eventCard);

    return { status: "success", message: "Blueprint created successfully." };
  } catch (error) {
    functions.logger.error("Error in genesisWeaver", error);
    // Trigger a chaos purification event card
    const errorCard = {
      type: "blueprint_creation_failed",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      payload: { blueprintName, error: (error as Error).message },
    };
    await db.collection("eventCards").add(errorCard);

    // Throw a more specific error to the client
    throw new functions.https.HttpsError("internal", "Failed to create blueprint.", error);
  }
});
