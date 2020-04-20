import React from 'react';

import { SplashSettings } from 'modules/settings';
import { useUserServices } from 'modules/user';
import { useAppState } from 'modules/app';

const Welcome: React.FC = () => {
  const [{ userData }] = useUserServices();
  const [, { setAppTheme }] = useAppState();

  React.useEffect(() => {
    if (userData) {
      setAppTheme({
        color: '#6A62FF',
        shapeClass: 'app__deco--default',
        showNav: false,
      });
    }
  }, [setAppTheme, userData]);

  return (
    <section className="app__content app--light l-vertical">
      <SplashSettings />
    </section>
  );
};

export { Welcome };
