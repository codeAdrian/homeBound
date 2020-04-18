import { FirestoreService } from 'modules/firebase';
import { updateScoreHistory } from 'modules/score';

const addUserContact = async (user: firebase.UserInfo, value: any) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  await firestore.addAsync(value);
};

const removeUserContact = async (user: firebase.UserInfo, id: string) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  await firestore.removeAsync(id);
};

const completeUserContact = async (user: firebase.UserInfo, id: string) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  const completedTask = await firestore.getByIdAsync(id);

  delete completedTask.id;

  await updateScoreHistory(user, completedTask);
};

export { addUserContact, completeUserContact, removeUserContact };
