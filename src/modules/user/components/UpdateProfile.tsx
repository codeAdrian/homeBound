import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import { TextInput } from 'components';
import { useUserServices } from 'modules/user';

export const UpdateProfile = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const { displayName } = watch();

  const onSubmit = (values: FieldValues) => {
    const { dislayName } = values;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        errors={errors}
        hasValue={!!displayName}
        name="displayName"
        label="Your name"
        type="text"
        componentRef={register({
          required: 'This field is required',
        })}
      />
    </form>
  );
};
