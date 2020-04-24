import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import { emailRegex } from 'util/validation';
import { FirebaseService } from 'modules/firebase';
import { createUserDocument } from 'modules/user';
import { TextInput, BUTTON, Button } from 'components';

const SignUpEmail: React.FC = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const firebase = FirebaseService.Instance;
  const authProvider = firebase.auth();

  const { email, password } = watch();

  const onSubmit = async (values: FieldValues) => {
    const { email, password } = values;
    const { user } = await authProvider.createUserWithEmailAndPassword(
      email,
      password,
    );
    if (!user) return;
    await createUserDocument(user);
  };

  const emailPattern = {
    value: emailRegex,
    message: 'Invalid email address',
  };

  const emailRef = register({
    required: 'This field is required',
    pattern: emailPattern,
  });

  const passwordRef = register({
    required: 'This field is required',
    min: { value: 6, message: 'Password should be at least 6 characters' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="u-sb-28">
        <TextInput
          errors={errors}
          hasValue={!!email}
          name="email"
          label="Email"
          type="text"
          componentRef={emailRef}
        />

        <TextInput
          errors={errors}
          hasValue={!!password}
          label="Password"
          name="password"
          autoComplete="new-password"
          type="password"
          componentRef={passwordRef}
        />
      </div>

      <p>
        <Button className={BUTTON.PILL.PRIMARY.BASE}>Sign Up</Button>
      </p>
    </form>
  );
};

export { SignUpEmail };
