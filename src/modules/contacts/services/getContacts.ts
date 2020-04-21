import { FirestoreService, ListenerProps } from 'modules/firebase';

const getLastContacts = (
  user: firebase.UserInfo,
  n: number,
  listenerProps: ListenerProps,
) => {
  const firestore = new FirestoreService(`contacts/${user.uid}/userContacts`);

  return firestore.filterByDate(listenerProps, n);
};

export { getLastContacts };
