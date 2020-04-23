import React from 'react';

import { useAppState } from 'modules/app';

import Portal from './Portal';

interface Props {
  isModalOpen: boolean;
}

export const Modal: React.FC<Props> = ({ children, isModalOpen }) => {
  const [{ theme }] = useAppState();
  const modalClassName = isModalOpen ? 'modal modal--open' : 'modal';
  return (
    <Portal id="app-root">
      <aside
        className={modalClassName}
        style={{ backgroundColor: theme.color }}
      >
        {children}
      </aside>
    </Portal>
  );
};
