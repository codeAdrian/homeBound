import React from 'react';

import { Heading, HEADING } from 'components';

export const GeneralError = () => {
  return (
    <section className="app__content">
      <aside className="u-f--spaceBetween u-sb-12">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Watch out!
        </Heading>
      </aside>
      <main>
        Woops, you entered an unsafe area. Keep your social distance and put
        your masks on!
      </main>
    </section>
  );
};
