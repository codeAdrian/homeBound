import { useEffect, useRef } from 'react';

import { FirebaseService } from 'modules/firebase';
import { useAuthStateChange } from 'modules/user';

const useAuthData = () => {
  const handleAuthChange = useAuthStateChange();
  const unsubscribeFromAuth = useRef<VoidFunction>(() => false);

  useEffect(() => {
    const firebase = FirebaseService.Instance;
    const auth = firebase.auth();

    unsubscribeFromAuth.current = auth.onAuthStateChanged(handleAuthChange);

    return () => {
      unsubscribeFromAuth.current();
    };
  }, [handleAuthChange]);
};

export { useAuthData };
