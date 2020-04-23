import React from 'react';

import { Heading, HEADING, Button, BUTTON } from 'components';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { useAppState } from 'modules/app';

export const Activities = () => {
  const [, { setAppTheme }] = useAppState();

  React.useEffect(() => {
    setAppTheme({
      color: '#6A62FF',
      shapeClass: 'app__deco--default',
      showNav: true,
    });
  }, [setAppTheme]);

  return (
    <section className="app__content">
      <aside className="u-f--spaceBetween u-sb-12">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Activities
        </Heading>
        <Button
          icon={<PlusIcon />}
          className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
          onClick={() => false}
        />
      </aside>
      <main>Content</main>
    </section>
  );
};
