import React from 'react';

import { Routing } from 'modules/routing';
import { useAppState } from 'modules/app';
import { ReactComponent as DecoBubble } from 'assets/icons/deco-bubble.svg';

export const AppLayout: React.FC = () => {
  const [{ themeColor }] = useAppState();
  return (
    <>
      <section
        className="app__background app__background--primary"
        style={{ backgroundColor: themeColor }}
      >
        <Routing />
      </section>
      <DecoBubble className="app__deco" />
    </>
  );
};
