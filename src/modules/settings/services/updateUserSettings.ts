import { FirestoreService, Collections } from 'modules/firebase';

export const getUserDocumentSettings = async (uid: firebase.User['uid']) => {
  if (!uid) return null;
  const firestore = new FirestoreService(Collections.Settings);

  return firestore.getByIdAsync(uid);
};

const updateUserSettings = async (
  user: firebase.UserInfo,
  value: { [key: string]: boolean },
) => {
  const firestore = new FirestoreService(Collections.Settings);
  const settings = await getUserDocumentSettings(user.uid);

  firestore.addAsync({
    id: user.uid,
    ...settings,
    ...value,
  });

  const updatedSettings = await getUserDocumentSettings(user.uid);

  return updatedSettings;
};

export { updateUserSettings };
