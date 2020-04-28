import React from 'react';

import { Heading, HEADING } from 'components';
import { useAppState } from 'modules/app';

export const Offline = () => {
  const [
    {
      theme: { showNav },
    },
    { setAppTheme },
  ] = useAppState();

  React.useEffect(() => {
    setAppTheme({
      color: '#6A62FF',
      shapeClass: 'app__deco--default',
      showNav,
    });
  }, [setAppTheme, showNav]);

  return (
    <section className="app__content l-page app--light">
      <aside className="u-f--spaceBetween u-sb-40">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Uh, oh...
        </Heading>
      </aside>
      <main className="l-vertical u-f--grow1">
        <div className="u-sb-40">
          <Heading tag="h2" className={HEADING.PRIMARY.XLARGE.BOLD}>
            It seems that you're offline.
          </Heading>
        </div>
        <Heading tag="div" className={HEADING.SECONDARY.SMALL.BOLD}>
          Thats okay, too. Use this time to have some rest inbetween having fun
          and doing things.
        </Heading>
      </main>
    </section>
  );
};
