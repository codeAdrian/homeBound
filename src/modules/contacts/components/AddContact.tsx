import * as React from 'react';
import { format, add, isToday } from 'date-fns';
import { useForm, FieldValues } from 'react-hook-form';

import { useContactsServices } from 'modules/contacts';
import { TextInput, BUTTON, Button } from 'components';

interface Props {
  callback: VoidFunction;
}

const AddContact: React.FC<Props> = ({ callback }) => {
  const { handleSubmit, register, watch, reset } = useForm();
  const [, { addContact }] = useContactsServices();

  const onSubmit = (values: FieldValues) => {
    const { date, name, phoneNumber } = values;

    const dateValue = new Date();

    const newDate = isToday(new Date(date))
      ? add(new Date(date).setHours(0, 0, 0, 0), {
          hours: dateValue.getHours(),
          minutes: dateValue.getMinutes(),
          seconds: dateValue.getSeconds(),
        })
      : new Date(date);
    addContact({
      date: newDate,
      name,
      phoneNumber,
    });
    reset();
    callback();
  };

  const { date, name, phoneNumber } = watch();

  return (
    <form className="l-vertical u-f--grow1" onSubmit={handleSubmit(onSubmit)}>
      <div>
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
      </div>

      <Button className={BUTTON.PILL.CTA.BASE.GLOW}>Save</Button>
    </form>
  );
};

export { AddContact };
