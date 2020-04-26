import React from 'react';
import { Link } from 'react-router-dom';

import { Heading, HEADING, BUTTON } from 'components';
import { useAppState } from 'modules/app';

export const NotFound = () => {
  const [, { setAppTheme }] = useAppState();

  React.useEffect(() => {
    setAppTheme({
      color: '#F7CE53',
      shapeClass: 'app__deco--default',
      showNav: false,
    });
  }, [setAppTheme]);

  return (
    <section className="app__content l-page">
      <aside className="u-f--spaceBetween u-sb-40">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Uh, oh...
        </Heading>
      </aside>
      <main className="l-vertical u-f--grow1">
        <div className="u-f--spaceBetween u-sb-40">
          <Heading tag="h2" className={HEADING.PRIMARY.XLARGE.BOLD}>
            It seems you got lost, but at least you're safe at home.
          </Heading>
        </div>
        <div className="u-sb-40">
          <Link className={BUTTON.PILL.PRIMARY.BASE} to="/">
            Go back
          </Link>
        </div>
      </main>
    </section>
  );
};
