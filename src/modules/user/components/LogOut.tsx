import * as React from 'react';

import { FirebaseService } from 'modules/firebase';
import { Button, BUTTON } from 'components';

const LogOut: React.FC = () => {
  const auth = FirebaseService.AuthProvider;

  const handleLogout = React.useCallback(() => {
    auth.signOut();
  }, [auth]);

  return (
    <Button className={BUTTON.PILL.PRIMARY.BASE} onClick={handleLogout}>
      Sign out
    </Button>
  );
};

export { LogOut };
