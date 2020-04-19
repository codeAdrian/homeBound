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

type FormatState = (error: boolean, submit: boolean, success: boolean) => State;

export const useMessageService = () => {
  const formatState = React.useCallback<FormatState>(
    (hasError, isSubmitting, submitSuccess) => ({
      hasError,
      isSubmitting,
      submitSuccess,
    }),
    [],
  );
  const [hookState, setHookState] = React.useState<State>(
    formatState(false, false, false),
  );

  const handleSuccess = React.useCallback(() => {
    setHookState(formatState(false, false, true));
  }, [formatState]);

  const handleError = React.useCallback(() => {
    setHookState(formatState(true, false, false));
  }, [formatState]);

  const sendMessage = React.useCallback(
    (message: any) => {
      setHookState(formatState(false, true, false));
      messageContact(message, handleSuccess, handleError);
    },
    [formatState, handleError, handleSuccess],
  );

  const api = React.useMemo(
    () => ({
      sendMessage,
    }),
    [sendMessage],
  );

  return [hookState, api] as [State, Api];
};
