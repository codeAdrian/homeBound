import React from 'react';
import { toast, ToastType, ToastPosition } from 'react-toastify';

import { CustomHook } from 'models';
import { messageContact } from 'modules/contacts';

interface State {
  hasError: boolean;
  isSubmitting: boolean;
  submitSuccess: boolean;
}

export interface Message {
  to: string;
  body: string;
}

interface Api {
  sendMessage: (message: Message) => void;
}

type FormatState = (error: boolean, submit: boolean, success: boolean) => State;

export const useMessageService: CustomHook<State, Api> = () => {
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
    toast('SMS Message has been sent successfully', {
      closeButton: false,
      position: ToastPosition.TOP_CENTER,
      type: ToastType.SUCCESS,
    });
  }, [formatState]);

  const handleError = React.useCallback(() => {
    toast('Uh oh... SMS message could not be sent. Try again later.', {
      closeButton: false,
      position: ToastPosition.TOP_CENTER,
      type: ToastType.ERROR,
    });
    setHookState(formatState(true, false, false));
  }, [formatState]);

  const sendMessage = React.useCallback(
    (message: Message) => {
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

  return [hookState, api];
};
