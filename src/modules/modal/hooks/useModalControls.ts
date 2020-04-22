import React from 'react';

interface Api {
  toggleModalState: VoidFunction;
}

export const useModalControls = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModalState = React.useCallback(() => {
    const newState = !isModalOpen;
    setIsModalOpen(newState);
  }, [isModalOpen]);

  const state = isModalOpen;
  const api = React.useMemo(
    () => ({
      toggleModalState,
    }),
    [toggleModalState],
  );

  return [state, api] as [boolean, Api];
};
