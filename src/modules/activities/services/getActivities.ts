import { FirestoreService } from 'modules/firebase';

const getUserActivitiesListener = async (
  user: firebase.UserInfo,
  successFunction: (data: unknown) => void,
  errorFunction: (error: string) => void,
) => {
  const firestore = new FirestoreService('activities');

  firestore.getByIdAsync(user.uid, {
    successFunction,
    errorFunction,
  });
};

const getUserActivities = async (user: firebase.UserInfo) => {
  const firestore = new FirestoreService('activities');

  return firestore.getSubcollection(user.uid, 'userActivity');
};

export { getUserActivities, getUserActivitiesListener };
