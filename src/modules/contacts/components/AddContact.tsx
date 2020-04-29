import * as React from 'react';
import { format, add, isToday } from 'date-fns';
import { useForm, FieldValues } from 'react-hook-form';

import { useContactsServices } from 'modules/contacts';
import { TextInput, BUTTON, Button } from 'components';

interface Props {
  callback: VoidFunction;
}

const AddContact: React.FC<Props> = ({ callback }) => {
  const { handleSubmit, register, watch, reset, errors } = useForm();
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

  const pattern = /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/gm;

  const { date, name, phoneNumber } = watch();

  return (
    <form className="l-vertical u-f--grow1" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextInput
          errors={errors}
          hasValue={!!name}
          name="name"
          label="Name"
          type="text"
          componentRef={register({
            required: 'This field is required',
          })}
        />
        <TextInput
          errors={errors}
          className="input__control--date"
          max={format(new Date(), 'Y-MM-dd')}
          hasValue={!!date}
          name="date"
          label="Date"
          type="date"
          componentRef={register({
            required: 'This field is required',
          })}
        />
        <TextInput
          errors={errors}
          hasValue={!!phoneNumber}
          name="phoneNumber"
          label="Phone Number (optional)"
          type="text"
          componentRef={register({
            pattern: {
              value: pattern,
              message: 'Phone number must start with +XXX',
            },
          })}
        />
      </div>

      <Button className={BUTTON.PILL.CTA.BASE.GLOW}>Save</Button>
    </form>
  );
};

export { AddContact };
