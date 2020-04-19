import { FirestoreService } from 'modules/firebase';
import { updateScoreHistory } from 'modules/score';

const addUserActivity = async (user: firebase.UserInfo, value: any) => {
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

  console.log(completedTask);

  delete completedTask.id;

  await updateScoreHistory(user, completedTask);
};

export { addUserActivity, completeUserActivity, removeUserActivity };