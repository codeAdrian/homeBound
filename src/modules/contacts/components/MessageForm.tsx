import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';

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

  const onSubmit = (values: FieldValues) => {
    const { message } = values;
    const body = `Message from ${userData?.displayName}: ${message}`;
    sendMessage({
      to: currentContact.phoneNumber,
      body,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button className={BUTTON.PILL.CTA.BASE.GLOW}>Send message</Button>
    </form>
  );
};

export { MessageForm };
