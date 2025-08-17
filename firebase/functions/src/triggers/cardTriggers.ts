import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// This function could, for example, react to new event cards being created.
export const onEventCardCreate = functions.firestore
  .document('eventCards/{cardId}')
  .onCreate((snap, context) => {

    const newCard = snap.data();
    functions.logger.info(`New Event Card Created: ${newCard.type}`, { cardId: context.params.cardId });

    // Example: send a notification, or trigger another process
    // For now, we just log it.

    return null; // or a promise
});
