import isEmpty from 'lodash/isEmpty';

import { FirestoreService } from 'modules/firebase';

const formatUserDocumentData = (user: firebase.User) => {
  const { displayName, email, photoURL, uid } = user;
  const createdAt = new Date();

  return {
    id: uid,
    uid: uid,
    displayName,
    email,
    photoURL,
    createdAt,
  };
};

const getUserDocument = async (uid: firebase.User['uid']) => {
  if (!uid) return null;
  const firestore = new FirestoreService('users');

  return firestore.getByIdAsync(uid);
};

const createUserDocument = async (
  user: firebase.User,
  additionalData?: Partial<firebase.User>,
) => {
  if (isEmpty(user)) return;
  const firestore = new FirestoreService('users');
  const userRef = await getUserDocument(user.uid);

  if (userRef.uid) return userRef;

  const userData = formatUserDocumentData(user);

  firestore.addAsync({
    ...userData,
    ...additionalData,
  });

  const updatedDocument = await getUserDocument(user.uid);

  return updatedDocument;
};

export { createUserDocument, getUserDocument };
