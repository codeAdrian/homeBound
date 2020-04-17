import { FirestoreService } from 'modules/firebase';
import { ScoreHistory } from 'modules/score';

const updateScoreHistory = async (
  user: firebase.UserInfo,
  value: ScoreHistory,
) => {
  const firestore = new FirestoreService(`score/${user.uid}/history`);

  firestore.addAsync(value);
};

export { updateScoreHistory };
