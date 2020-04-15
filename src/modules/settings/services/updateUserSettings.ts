import isEmpty from 'lodash/isEmpty';

import { FirestoreService, Collections } from 'modules/firebase';
import { getUserDocument } from 'modules/user';

/*
const updateUserSettings = async (user: firebase.UserInfo) => {
  const firestore = new FirestoreService(Collections.Users);
  const userRef = await getUserDocument(user.uid);

  const { newValue } = userRef;

  firestore.updateByIdAsync(
    {
      newValue: true,
    },
    user.uid,
  );

  const updatedDocument = await getUserDocument(user.uid);

  return updatedDocument;
};
*/

const updateUserSettings = async (
  user: firebase.UserInfo,
  value: { [key: string]: boolean },
) => {
  const firestore = new FirestoreService(Collections.Users);
  const userRef = await getUserDocument(user.uid);

  const { settings } = userRef;

  firestore.updateByIdAsync(
    {
      settings: {
        ...settings,
        ...value,
      },
    },
    user.uid,
  );

  const updatedDocument = await getUserDocument(user.uid);

  return updatedDocument;
};

export { updateUserSettings };
