import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * This file will contain background trigger functions related to cards.
 * For example, a function that runs whenever a new card is created.
 */

// Example of a potential Firestore trigger. This is commented out for now.
/*
export const onCardCreate = functions.firestore.document('cards/{cardId}')
    .onCreate((snap, context) => {
        const newCard = snap.data();
        console.log(`A new card was created: ${newCard.name}`);

        // We could perform actions here, like updating user stats,
        // sending notifications, etc.

        return null; // Return null or a promise
    });
*/

// To keep the file valid, we'll export a dummy constant.
export const placeholder = 'This is a placeholder for card triggers.';
