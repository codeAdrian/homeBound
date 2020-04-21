import { FirestoreService, ListenerProps } from 'modules/firebase';

const getUserContacts = async (user: firebase.UserInfo) => {
  const firestore = new FirestoreService('contacts');

  return firestore.getSubcollection(user.uid, 'userContacts');
};

const getLastContacts = (
  user: firebase.UserInfo,
  n: number,
  listenerProps: ListenerProps,
) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  return firestore.filterByDate(listenerProps, n);
};

export { getUserContacts, getLastContacts };
