import * as React from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import { emailRegex } from 'util/validation';
import { FirebaseService } from 'modules/firebase';
import { TextInput } from 'components';

const LoginWithEmail: React.FC = () => {
  const { handleSubmit, register, errors } = useForm();
  const firebase = FirebaseService.Instance;
  const authProvider = firebase.auth();

  const onSubmit = (values: FieldValues) => {
    const { email, password } = values;
    authProvider.signInWithEmailAndPassword(email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <TextInput
        label="Email"
        name="email"
        ref={register({
          required: 'Required',
          pattern: {
            value: emailRegex,
            message: 'Invalid email address',
          },
        })}
      />
      {errors.email && errors.email.message}

      <TextInput
        label="Password"
        name="password"
        type="password"
        ref={register({ required: 'Required' })}
      />
      {errors.username && errors.username.message}

      <button type="submit">Submit</button>
    </form>
  );
};

export { LoginWithEmail };
