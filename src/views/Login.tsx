import * as React from 'react';
import { Link } from 'react-router-dom';

import { LoginWithGoogle, LoginWithEmail } from 'modules/user';

const Login: React.FC = () => (
  <>
    <LoginWithEmail />
    <LoginWithGoogle />
    <div>
      <Link to="/signup">Sign up</Link>
    </div>
  </>
);

export { Login };
