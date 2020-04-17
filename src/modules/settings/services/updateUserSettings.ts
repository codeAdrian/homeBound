import isEmpty from 'lodash/isEmpty';

import { FirestoreService } from 'modules/firebase';

export const getUserDocumentSettings = async (user?: firebase.UserInfo) => {
  if (isEmpty(user) || !user) return null;
  const firestore = new FirestoreService('settings');
  return firestore.getByIdAsync(user.uid);
};

const updateUserSettings = async (
  user?: firebase.UserInfo,
  value?: { [key: string]: boolean },
) => {
  if (!user || !value || isEmpty(user) || isEmpty(value)) return;
  const firestore = new FirestoreService('settings');
  const settings = await getUserDocumentSettings(user);

  delete settings.id;

  if (isEmpty(settings)) {
    await firestore.addAsync({ id: user.uid, ...value });
  } else {
    await firestore.updateByIdAsync(value, user.uid);
  }
};

export { updateUserSettings };
