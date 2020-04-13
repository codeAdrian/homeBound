import * as React from 'react';

import { FirebaseService } from 'modules/firebase';

const LogOut = () => {
  const firebase = FirebaseService.Instance;
  const auth = firebase.auth();

  const handleLogout = React.useCallback(async () => {
    await auth.signOut();
  }, [auth]);

  return <button onClick={handleLogout}>Logout</button>;
};

export { LogOut };
