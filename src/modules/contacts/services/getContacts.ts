import { FirestoreService } from 'modules/firebase';

const getUserContacts = async (user: firebase.UserInfo) => {
  const firestore = new FirestoreService('contacts');

  return firestore.getSubcollection(user.uid, 'userContacts');
};

export { getUserContacts };
