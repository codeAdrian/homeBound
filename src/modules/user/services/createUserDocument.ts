import isEmpty from 'lodash/isEmpty';

import { FirestoreService, Collections } from 'modules/firebase';
import { User } from 'modules/user';

const formatUserDocumentData = (user: User) => {
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

const getUserDocument = async (uid: User['uid']) => {
  if (!uid) return null;
  const firestore = new FirestoreService(Collections.Users);

  return firestore.getByIdAsync(uid);
};

const createUserDocument = async (
  user: User,
  additionalData?: Partial<User>,
) => {
  if (isEmpty(user)) return;
  const firestore = new FirestoreService(Collections.Users);
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
