import React from 'react';

import { messageContact } from 'modules/contacts';

interface State {
  hasError: boolean;
  isSubmitting: boolean;
  submitSuccess: boolean;
}

interface Api {
  sendMessage: (message: any) => void;
}

export const useMessageService = () => {
  const [hookState, setHookState] = React.useState<State>({
    hasError: false,
    isSubmitting: false,
    submitSuccess: false,
  });

  const handleSuccess = React.useCallback(() => {
    setHookState({
      hasError: false,
      isSubmitting: false,
      submitSuccess: true,
    });
  }, []);

  const handleError = React.useCallback(() => {
    setHookState({
      hasError: true,
      isSubmitting: false,
      submitSuccess: false,
    });
  }, []);

  const sendMessage = React.useCallback(
    (message: any) => {
      setHookState({
        hasError: false,
        isSubmitting: true,
        submitSuccess: false,
      });

      messageContact(message, handleSuccess, handleError);
    },
    [handleError, handleSuccess],
  );

  const api = React.useMemo(
    () => ({
      sendMessage,
    }),
    [sendMessage],
  );

  return [hookState, api] as [State, Api];
};
