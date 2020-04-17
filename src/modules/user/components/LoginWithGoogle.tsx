import * as React from 'react';

import { FirebaseService } from 'modules/firebase';

const LoginWithGoogle: React.FC = () => {
  const firebase = FirebaseService.Instance;
  const authGoogle = FirebaseService.AuthProviderGoogle;
  const authProvider = firebase.auth();

  const handleLoginGoogle = React.useCallback(() => {
    authProvider.signInWithPopup(authGoogle);
  }, [authGoogle, authProvider]);

  return <button onClick={handleLoginGoogle}>Log in with Google</button>;
};

export { LoginWithGoogle };
