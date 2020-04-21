import React from 'react';

import { useAppState } from 'modules/app';

import Portal from './Portal';

export const Modal: React.FC = ({ children }) => {
  const [{ theme }] = useAppState();
  return (
    <Portal id="app-root">
      <aside className="modal" style={{ backgroundColor: theme.color }}>
        {children}
      </aside>
    </Portal>
  );
};
