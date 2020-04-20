import * as React from 'react';
import { Link } from 'react-router-dom';

import { LoginWithGoogle, LoginWithEmail } from 'modules/user';
import { useAppState } from 'modules/app';
import { Heading, HEADING } from 'components';

const Login: React.FC = () => {
  const [, { setAppTheme }] = useAppState();

  React.useEffect(() => {
    setAppTheme({
      color: '#6A62FF',
      shapeClass: 'app__deco--default',
      showNav: false,
    });
  }, [setAppTheme]);

  return (
    <section className="app__content app--light l-vertical">
      <article>
        <Heading className={HEADING.PRIMARY.XLARGE.BOLD} tag="h1">
          Hi there, welcome back
        </Heading>
        <p className="u-o-8">Wow, you're a regular! We like that.</p>
      </article>
      <article>
        <p>
          <LoginWithEmail />
        </p>
        <p className="u-t-center u-o-8">or use</p>
        <p>
          <LoginWithGoogle>Log in with Google</LoginWithGoogle>
        </p>
        <p className="u-t-center">
          <span className="u-o-8">Don't have an account? </span>
          <Link to="/signup">Sign up</Link>
        </p>
      </article>
    </section>
  );
};

export { Login };
