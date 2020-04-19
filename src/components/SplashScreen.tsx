import React from 'react';

import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { useAppState } from 'modules/app';

export const SplashScreen = () => {
  const [, { setAppThemeColor }] = useAppState();

  React.useEffect(() => {
    setAppThemeColor('#FAC936');
  }, [setAppThemeColor]);

  console.log('RENDER');

  return (
    <section className="app__content">
      <Logo />
      HomeBound
    </section>
  );
};
