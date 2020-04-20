import * as React from 'react';
import { Link } from 'react-router-dom';

import { SignUpEmail, LoginWithGoogle } from 'modules/user';
import { useAppState } from 'modules/app';
import { Heading, HEADING } from 'components';

const SignUp: React.FC = () => {
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
          Signup right now
        </Heading>
        <p className="o-08">
          It's not like you've got anything better to do at the moment
        </p>
      </article>
      <article>
        <SignUpEmail />
        <p className="u-t-center u-o-8">or</p>
        <p>
          <LoginWithGoogle>Use Google to signup</LoginWithGoogle>
        </p>
        <p className="u-t-center">
          <span className="u-o-8">Have an account? </span>
          <Link to="/login">Log in</Link>
        </p>
      </article>
    </section>
  );
};

export { SignUp };
