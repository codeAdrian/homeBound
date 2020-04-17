import * as React from 'react';

import { FirebaseService } from 'modules/firebase';

const LogOut: React.FC = () => {
  const firebase = FirebaseService.Instance;
  const auth = firebase.auth();

  const handleLogout = React.useCallback(() => {
    auth.signOut();
  }, [auth]);

  return <button onClick={handleLogout}>Logout</button>;
};

export { LogOut };
