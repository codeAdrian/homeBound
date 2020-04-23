import { FirestoreService } from 'modules/firebase';
import { ContactInput } from 'modules/contacts';

const addUserContact = (user: firebase.UserInfo, value: ContactInput) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  firestore.addAsync(value);
};

const removeUserContact = (user: firebase.UserInfo, id: string) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  firestore.removeAsync(id);
};

export { addUserContact, removeUserContact };
