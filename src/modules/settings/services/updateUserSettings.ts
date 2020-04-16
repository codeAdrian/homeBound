import isEmpty from 'lodash/isEmpty';

import { FirestoreService } from 'modules/firebase';

export const getUserDocumentSettings = async (uid: firebase.User['uid']) => {
  if (!uid) return null;
  const firestore = new FirestoreService('settings');

  return firestore.getByIdAsync(uid);
};

const updateUserSettings = async (
  user: firebase.UserInfo,
  value: { [key: string]: boolean },
) => {
  const firestore = new FirestoreService('settings');
  const settings = await getUserDocumentSettings(user.uid);

  console.log(settings);

  const { id, ...data } = settings;

  if (isEmpty(data)) {
    await firestore.addAsync({ id: user.uid, ...value });
  } else {
    await firestore.updateByIdAsync(value, user.uid);
  }

  const updatedSettings = await getUserDocumentSettings(user.uid);

  return updatedSettings;
};

export { updateUserSettings };
