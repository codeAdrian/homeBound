import * as React from 'react';

import { FirebaseService } from 'modules/firebase';
import { Button, BUTTON } from 'components';
import { ReactComponent as GoogleIcon } from 'assets/icons/google.svg';

const LoginWithGoogle: React.FC = ({ children }) => {
  const firebase = FirebaseService.Instance;
  const authGoogle = FirebaseService.AuthProviderGoogle;
  const authProvider = firebase.auth();

  const handleLoginGoogle = React.useCallback(() => {
    authProvider.signInWithPopup(authGoogle);
  }, [authGoogle, authProvider]);

  return (
    <Button
      className={BUTTON.PILL.PRIMARY.BASE}
      icon={<GoogleIcon />}
      onClick={handleLoginGoogle}
    >
      {children}
    </Button>
  );
};

export { LoginWithGoogle };
