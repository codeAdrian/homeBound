import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { toast, ToastType, ToastPosition } from 'react-toastify';

import { useMessageService, UserContact } from 'modules/contacts';
import { useUserServices } from 'modules/user';
import { Button, BUTTON } from 'components';

interface Props {
  currentContact: UserContact;
}
const MessageForm: React.FC<Props> = ({ currentContact }) => {
  const [{ userData }] = useUserServices();
  const [, { sendMessage }] = useMessageService();
  const { handleSubmit, register, reset } = useForm();

  const {
    REACT_APP_TWILIO_PHONE_NUMBER,
    REACT_APP_TEST_PHONE_NUMBER,
  } = process.env;

  const onSubmit = (values: FieldValues) => {
    if (!currentContact.phoneNumber) return;

    if (!REACT_APP_TWILIO_PHONE_NUMBER || !REACT_APP_TEST_PHONE_NUMBER) {
      toast(
        'SMS would be sent, but Twilio SMS functionality is disabled for this demo.',
        {
          closeButton: false,
          position: ToastPosition.TOP_CENTER,
          type: ToastType.WARNING,
        },
      );
      return;
    }
    const { message } = values;
    const body = `Message from ${userData?.displayName}: ${message}`;
    sendMessage({
      to: currentContact.phoneNumber,
      body,
    });
    reset();
  };

  return (
    <form className="l-vertical u-f--grow1" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>
          <strong>Name:</strong> {currentContact?.name}
        </p>
        <p>
          <strong>Phone number:</strong> {currentContact?.phoneNumber}
        </p>

        <label className="u-t__fontSize--xsmall u-o-6 input__label--textArea">
          Message
        </label>
        <textarea
          className="input__control--textArea"
          name="message"
          maxLength={150}
          ref={register({
            required: 'Required',
          })}
        />
      </div>
      <div className="u-sb-16">
        <Button className={BUTTON.PILL.CTA.BASE.GLOW}>Send message</Button>
      </div>
      {(!REACT_APP_TWILIO_PHONE_NUMBER || !REACT_APP_TEST_PHONE_NUMBER) && (
        <div className="u-t__fontSize--xsmall u-o-6">
          <strong>NOTE:</strong> Twilio SMS functionality is disabled for this
          demo. You can run the instance locally and provide API keys and a test
          phone number to test it.
        </div>
      )}
    </form>
  );
};

export { MessageForm };
