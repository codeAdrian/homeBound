import * as React from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import { emailRegex } from 'util/validation';
import { FirebaseService } from 'modules/firebase';
import { TextInput, Button, BUTTON } from 'components';

const LoginWithEmail: React.FC = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const firebase = FirebaseService.Instance;
  const authProvider = firebase.auth();

  const { email, password } = watch();

  const onSubmit = (values: FieldValues) => {
    const { email, password } = values;
    authProvider.signInWithEmailAndPassword(email, password);
  };

  return (
    <form id="sadasdasda" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        hasValue={!!email}
        name="email"
        label="Email"
        type="text"
        componentRef={register({
          required: 'Required',
          pattern: {
            value: emailRegex,
            message: 'Invalid email address',
          },
        })}
      />
      {errors.email && errors.email.message}

      <TextInput
        hasValue={!!password}
        autoComplete="new-password"
        name="password"
        label="Password"
        type="password"
        componentRef={register({ required: 'Required' })}
      />
      {errors.password && errors.password.message}

      <Button className={BUTTON.PILL.PRIMARY.BASE}>Login</Button>
    </form>
  );
};

export { LoginWithEmail };
