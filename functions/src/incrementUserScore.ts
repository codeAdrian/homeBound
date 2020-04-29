import * as functions from 'firebase-functions';
import admin = require('firebase-admin');

const firestore = admin.firestore();

export const incrementUserScore = functions.firestore
  .document('score/{userId}/history/{scoreId}')
  .onCreate(async (_, context) => {
    const { userId, scoreId } = context.params;
    const scoreRef = firestore.doc(`score/${userId}`);
    const historyRef = firestore.doc(`score/${userId}/history/${scoreId}`);

    const scoreSnap = await scoreRef.get();
    const historySnap = await historyRef.get();

    const scoreCurrent = scoreSnap.get('score');
    const scoreIncrement = historySnap.get(`score`);

    return scoreRef.update({ score: scoreCurrent + scoreIncrement });
  });
