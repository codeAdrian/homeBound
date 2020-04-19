import * as React from 'react';
import { Link } from 'react-router-dom';

import { LoginWithGoogle, LoginWithEmail } from 'modules/user';
import { useAppState } from 'modules/app';

const Login: React.FC = () => {
  const [, { setAppThemeColor }] = useAppState();

  React.useEffect(() => {
    console.log('DO IT');
    setAppThemeColor('#6A62FF');
  }, [setAppThemeColor]);

  return (
    <section className="app__content">
      <LoginWithEmail />
      <LoginWithGoogle />
      <div>
        <Link to="/signup">Sign up</Link>
      </div>
    </section>
  );
};

export { Login };
