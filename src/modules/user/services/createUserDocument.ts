import isEmpty from 'lodash/isEmpty';

import { FirestoreService } from 'modules/firebase';

const formatUserDocumentData = (user: firebase.UserInfo) => {
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

const getUserDocument = async (uid: firebase.UserInfo['uid']) => {
  if (!uid) return null;
  const firestore = new FirestoreService('users');

  return firestore.getByIdAsync(uid);
};

const updateUserDocument = async (
  user: firebase.UserInfo,
  value: Partial<firebase.UserInfo>,
) => {
  const firestore = new FirestoreService('users');
  await firestore.updateByIdAsync(value, user.uid);
  const userData = await getUserDocument(user.uid);
  return userData;
};

const createUserDocument = async (
  user: firebase.UserInfo,
  additionalData?: Partial<firebase.UserInfo>,
) => {
  if (isEmpty(user)) return;
  const userStore = new FirestoreService('users');
  const settingsStore = new FirestoreService('settings');
  const scoreStore = new FirestoreService('score');
  const userRef = await getUserDocument(user.uid);

  if (userRef.uid) return userRef;

  const userData = formatUserDocumentData(user);

  userStore.addAsync({
    ...userData,
    ...additionalData,
  });

  settingsStore.addAsync({
    id: user.uid,
    surveyCompleted: false,
  });

  scoreStore.addAsync({
    id: user.uid,
    score: 0,
  });

  const updatedDocument = await getUserDocument(user.uid);

  return updatedDocument;
};

export { createUserDocument, getUserDocument, updateUserDocument };
