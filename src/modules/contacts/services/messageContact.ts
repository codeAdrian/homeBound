import { Message } from 'modules/contacts';
import { FirebaseService } from 'modules/firebase';

type MessagingFuncion = (
  message: Message,
  handleSuccess: VoidFunction,
  handleError: VoidFunction,
) => void;

const messageContact: MessagingFuncion = async (
  message,
  handleSuccess,
  handleError,
) => {
  const functions = FirebaseService.FunctionsProvider;

  const {
    NODE_ENV,
    REACT_APP_TWILIO_PHONE_NUMBER,
    REACT_APP_TEST_PHONE_NUMBER,
  } = process.env;

  const sendSMSMessage = functions.httpsCallable('sendSMSMessage');

  const isDev = NODE_ENV === 'development';
  const res = await sendSMSMessage({
    from: REACT_APP_TWILIO_PHONE_NUMBER,
    to: isDev ? REACT_APP_TEST_PHONE_NUMBER : message.to,
    body: message.body,
  });

  const { success } = res.data;
  success ? handleSuccess() : handleError();
};

export { messageContact };
