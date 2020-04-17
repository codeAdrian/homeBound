import * as React from 'react';

import { LoginWithGoogle, LoginWithEmail } from 'modules/user';

const Login: React.FC = () => (
  <>
    <LoginWithEmail />
    <LoginWithGoogle />
  </>
);

export { Login };
