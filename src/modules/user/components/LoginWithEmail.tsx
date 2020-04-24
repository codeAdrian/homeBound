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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="u-sb-28">
        <TextInput
          errors={errors}
          hasValue={!!email}
          name="email"
          label="Email"
          type="text"
          componentRef={register({
            required: 'This field is required',
            pattern: {
              value: emailRegex,
              message: 'Invalid email address',
            },
          })}
        />

        <TextInput
          errors={errors}
          hasValue={!!password}
          autoComplete="new-password"
          name="password"
          label="Password"
          type="password"
          componentRef={register({ required: 'This field is required' })}
        />
      </div>

      <Button className={BUTTON.PILL.PRIMARY.BASE}>Login</Button>
    </form>
  );
};

export { LoginWithEmail };
