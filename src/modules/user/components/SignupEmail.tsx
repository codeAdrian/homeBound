import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import { emailRegex } from 'util/validation';
import { FirebaseService } from 'modules/firebase';
import { createUserDocument } from 'modules/user';

const SignUpEmail = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const password = React.useRef({});

  const firebase = FirebaseService.Instance;
  const authProvider = firebase.auth();

  password.current = watch('password', '');

  const validateSameValue = (value: string) =>
    value === password.current || 'The passwords do not match';

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
    required: true,
    pattern: emailPattern,
  });

  const passwordRef = register({ required: 'Required', min: 6 });

  const passwordConfirmRef = register({
    required: true,
    validate: validateSameValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" ref={emailRef} />
      {errors.email && errors.email.message}

      <input name="password" type="password" ref={passwordRef} />
      {errors.password && errors.password.message}

      <input name="passwordConfirm" type="password" ref={passwordConfirmRef} />
      {errors.passwordConfirm && errors.passwordConfirm.message}

      <button type="submit">Submit</button>
    </form>
  );
};

export { SignUpEmail };
