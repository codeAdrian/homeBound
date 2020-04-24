import * as React from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import { useActivitiesServices } from 'modules/activities';
import { TextInput, BUTTON, Button } from 'components';

interface Props {
  callback: VoidFunction;
}

const AddActivity: React.FC<Props> = ({ callback }) => {
  const [, { addActivity }] = useActivitiesServices();
  const { handleSubmit, register, watch, reset } = useForm();

  const onSubmit = (values: FieldValues) => {
    const { title } = values;
    const dateValue = new Date();

    addActivity({
      date: dateValue,
      title,
      score: Math.floor(Math.random() * 9 + 2),
      style: Math.floor(Math.random() * 3),
    });

    reset();
    callback();
  };

  const { title } = watch();

  return (
    <form
      className="l-vertical l-page u-f--grow1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        hasValue={!!title}
        name="title"
        label="What do you want to do?"
        type="text"
        max={32}
        componentRef={register({
          required: 'Required',
        })}
      />

      <Button className={BUTTON.PILL.CTA.BASE.GLOW}>Add activity</Button>
    </form>
  );
};

export { AddActivity };
