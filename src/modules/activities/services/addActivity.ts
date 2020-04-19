import { FirestoreService } from 'modules/firebase';
import { updateScoreHistory } from 'modules/score';
import { ActivityInput } from 'modules/activities';

const addUserActivity = async (
  user: firebase.UserInfo,
  value: ActivityInput,
) => {
  const firestore = new FirestoreService(`activities/${user.uid}/userActivity`);

  await firestore.addAsync(value);
};

const removeUserActivity = async (user: firebase.UserInfo, id: string) => {
  const firestore = new FirestoreService(`activities/${user.uid}/userActivity`);

  await firestore.removeAsync(id);
};

const completeUserActivity = async (user: firebase.UserInfo, id: string) => {
  const firestore = new FirestoreService(`activities/${user.uid}/userActivity`);

  const completedTask = await firestore.getByIdAsync(id);

  delete completedTask.id;

  await updateScoreHistory(user, completedTask);
};

export { addUserActivity, completeUserActivity, removeUserActivity };
