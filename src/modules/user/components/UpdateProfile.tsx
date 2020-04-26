import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { toast, ToastPosition, ToastType } from 'react-toastify';

import { TextInput, Button, BUTTON } from 'components';
import { useUserServices } from 'modules/user';

export const UpdateProfile = () => {
  const [{ userData }, { updateUserProfile }] = useUserServices();
  const { handleSubmit, register, errors, watch } = useForm({
    defaultValues: {
      displayName: userData?.displayName,
    },
  });
  const { displayName } = watch();

  const onSubmit = React.useCallback(
    async (values: FieldValues) => {
      const { displayName } = values;
      if (!userData || userData.displayName === displayName) return;
      try {
        await updateUserProfile(userData, { displayName });
        toast('Profile saved successfuly', {
          closeButton: false,
          position: ToastPosition.TOP_CENTER,
          type: ToastType.SUCCESS,
        });
      } catch (error) {
        toast(error.message, {
          closeButton: false,
          position: ToastPosition.TOP_CENTER,
          type: ToastType.ERROR,
        });
      }
    },
    [updateUserProfile, userData],
  );

  return (
    <form className="u-sb-28" onSubmit={handleSubmit(onSubmit)}>
      <div className="u-sb-28">
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
      </div>
      <Button className={BUTTON.PILL.CTA.BASE.GLOW}>Update</Button>
    </form>
  );
};
