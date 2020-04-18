import { FirestoreService } from 'modules/firebase';

const getUserContactsListener = async (
  user: firebase.UserInfo,
  successFunction: (data: unknown) => void,
  errorFunction: (error: string) => void,
) => {
  const firestore = new FirestoreService('contacts');

  firestore.getByIdAsync(user.uid, {
    successFunction,
    errorFunction,
  });
};

const getUserContacts = async (user: firebase.UserInfo) => {
  const firestore = new FirestoreService('contacts');

  return firestore.getSubcollection(user.uid, 'userContacts');
};

export { getUserContacts, getUserContactsListener };
