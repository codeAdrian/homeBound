import React from 'react';

import { Routing } from 'modules/routing';
import { useAppState } from 'modules/app';

export const AppLayout: React.FC = () => {
  const [{ theme }] = useAppState();
  return (
    <>
      <section
        className="app__background app__background--primary"
        style={{ backgroundColor: theme.color }}
      >
        <Routing />
      </section>
      <svg
        width="260"
        height="360"
        viewBox="0 0 251 349"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`app__deco ${theme.shapeClass}`}
      >
        <path />
      </svg>
    </>
  );
};
