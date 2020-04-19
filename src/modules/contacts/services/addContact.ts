import { FirestoreService } from 'modules/firebase';

const addUserContact = async (user: firebase.UserInfo, value: any) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  await firestore.addAsync(value);
};

const removeUserContact = async (user: firebase.UserInfo, id: string) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  await firestore.removeAsync(id);
};

export { addUserContact, removeUserContact };
