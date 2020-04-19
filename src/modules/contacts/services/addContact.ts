import { FirestoreService } from 'modules/firebase';
import { ContactInput } from 'modules/contacts';

const addUserContact = async (user: firebase.UserInfo, value: ContactInput) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  await firestore.addAsync(value);
};

const removeUserContact = async (user: firebase.UserInfo, id: string) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  await firestore.removeAsync(id);
};

export { addUserContact, removeUserContact };
