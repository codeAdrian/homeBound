import isEmpty from 'lodash/isEmpty';

import { FirestoreService, Collections } from 'modules/firebase';
import { User } from 'modules/user';

const getUserDocument = async (uid: string) => {
  if (!uid) return null;

  const firestore = new FirestoreService(Collections.Users);

  return firestore.getByIdAsync(uid);
};

const createUserDocument = async (
  user: User,
  additionalData?: Partial<User>,
) => {
  if (!user) return;
  const firestore = new FirestoreService('users');

  const userRef = await firestore.getByIdAsync(user.uid);

  if (!isEmpty(userRef)) {
    const { displayName, email, photoURL, uid } = user;
    const createdAt = new Date();

    const userData = {
      id: uid,
      uid: uid,
      displayName,
      email,
      photoURL,
      createdAt,
    };

    firestore.addAsync({
      ...userData,
      ...additionalData,
    });
  }

  return getUserDocument(user.uid);
};

export { createUserDocument, getUserDocument };
