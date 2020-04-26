import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import { ReactComponent as Checkbox } from 'assets/icons/checkbox.svg';
import { QUESTIONS, useSettingsServices } from 'modules/settings';
import { useUserServices } from 'modules/user';

export const UpdateSettings: React.FC = () => {
  const [{ userData }] = useUserServices();
  const [
    { userSettings, isLoading },
    { updateSettings },
  ] = useSettingsServices();
  const { register } = useForm({
    defaultValues: {
      hasAssignedSelfIsolation: userSettings?.hasAssignedSelfIsolation
        ? '1'
        : '0',
      isLivingAlone: userSettings?.isLivingAlone ? '1' : '0',
    },
  });

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      if (!userData) return;
      updateSettings(userData, {
        [name]: !!parseInt(value),
      });
    },
    [updateSettings, userData],
  );

  return (
    <form className={isLoading ? 'u-o-5' : ''}>
      {QUESTIONS.map(
        ({ question, answerPositive, answerNegative, label }, index) => (
          <div className="settingsCard" key={label}>
            <div className="settingsCard__number u-t__fontSize--xxsmall">
              Question {index + 1}
            </div>
            <span className="u-t__fontFamily--secondary u-t__fontWeight--bold">
              {question}
            </span>
            <div className="settingsCard__control settingsCard__control--first">
              <input
                id={`${label}-positive`}
                className="settingsCard__input"
                name={label}
                ref={register()}
                onChange={onChange}
                value="1"
                type="radio"
              />
              <label
                htmlFor={`${label}-positive`}
                className="settingsCard__label"
              >
                <span>{answerPositive}</span>
                <Checkbox />
              </label>
            </div>
            <div className="settingsCard__control">
              <input
                id={`${label}-negative`}
                name={label}
                ref={register()}
                onChange={onChange}
                value="0"
                className="settingsCard__input"
                type="radio"
              />
              <label
                htmlFor={`${label}-negative`}
                className="settingsCard__label"
              >
                <span>{answerNegative}</span>
                <Checkbox />
              </label>
            </div>
          </div>
        ),
      )}
    </form>
  );
};
