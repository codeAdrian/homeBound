import { FirestoreService } from 'modules/firebase';
import { ScoreHistory } from 'modules/score';

const updateScoreHistory = async (
  user: firebase.UserInfo,
  value: ScoreHistory,
) => {
  const firestore = new FirestoreService(`score/${user.uid}/history`);

  firestore.addAsync(value);
};

const getUserScoreHistoryData = async (user: firebase.UserInfo) => {
  const firestore = new FirestoreService(`score`);
  return firestore.getSubcollection(user.uid, 'history');
};

const getUserScoreData = (
  user: firebase.UserInfo,
  successFunction: (data: unknown) => void,
  errorFunction: (error: string) => void,
) => {
  const firestore = new FirestoreService(`score`);

  firestore.getByIdAsync(user.uid, {
    successFunction,
    errorFunction,
  });
};

export { getUserScoreData, updateScoreHistory, getUserScoreHistoryData };
