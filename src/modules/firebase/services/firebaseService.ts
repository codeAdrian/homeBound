import firebase from 'firebase/app';
import 'firebase/auth';

import { config } from 'modules/firebase';

export class FirebaseService {
  private static instance: firebase.app.App;
  private static firebaseConfig = config;

  public static get AuthProvider() {
    return firebase.auth();
  }

  public static get AuthProviderGoogle() {
    return new firebase.auth.GoogleAuthProvider();
  }

  public static get AuthProviderEmail() {
    return firebase.auth.EmailAuthProvider;
  }

  public static get Instance() {
    return (
      this.instance ||
      (this.instance = firebase.initializeApp(this.firebaseConfig))
    );
  }
}
