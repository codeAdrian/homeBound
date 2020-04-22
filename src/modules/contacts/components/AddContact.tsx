import * as React from 'react';
import { format } from 'date-fns';
import { useForm, FieldValues } from 'react-hook-form';

import { useContactsServices } from 'modules/contacts';
import { TextInput, BUTTON, Button } from 'components';

interface Props {
  callback: VoidFunction;
}

const AddContact: React.FC<Props> = ({ callback }) => {
  const { handleSubmit, register, watch } = useForm();
  const [, { addContact }] = useContactsServices();

  const onSubmit = (values: FieldValues) => {
    const { date, name, phoneNumber } = values;
    addContact({
      date: new Date(date),
      name,
      phoneNumber,
    });

    callback();
  };

  const { date, name, phoneNumber } = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        hasValue={!!name}
        name="name"
        label="Name"
        type="text"
        componentRef={register({
          required: 'Required',
        })}
      />

      <TextInput
        hasValue={!!phoneNumber}
        name="phoneNumber"
        label="Phone Number"
        type="text"
        componentRef={register({
          required: 'Required',
        })}
      />

      <TextInput
        className="input__control--date"
        max={format(new Date(), 'Y-MM-dd')}
        hasValue={!!date}
        name="date"
        label="Date"
        type="date"
        componentRef={register({
          required: 'Required',
        })}
      />

      <Button className={BUTTON.PILL.CTA.BASE.GLOW}>Save</Button>
    </form>
  );
};

export { AddContact };
