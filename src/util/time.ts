import firebase from 'firebase';

export type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export const toDate = ({ seconds, nanoseconds }: Timestamp) =>
  new firebase.firestore.Timestamp(seconds, nanoseconds).toDate();
