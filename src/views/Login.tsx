import * as React from 'react';

import { LoginWithGoogle, LoginWithEmail } from 'modules/user';

const Login = () => (
  <>
    <LoginWithEmail />
    <LoginWithGoogle />
  </>
);

export { Login };
