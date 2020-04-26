import firebase from 'firebase/app';
import 'firebase/auth';

export class FirebaseService {
  private static instance: firebase.app.App;
  private static firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  public static get AuthProvider() {
    return this.Instance.auth();
  }

  public static get FunctionsProvider() {
    const functions = this.Instance.functions();
    if (process.env.NODE_ENV === 'development') {
      functions.useFunctionsEmulator('http://localhost:5001');
    }

    return functions;
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
