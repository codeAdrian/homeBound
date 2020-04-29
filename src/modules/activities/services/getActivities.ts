import { FirestoreService } from 'modules/firebase';

const getUserActivities = (user: firebase.UserInfo) => {
  const firestore = new FirestoreService('activities');

  return firestore.getSubcollection(user.uid, 'userActivity');
};

export { getUserActivities };
