import React from 'react';
import { NestDataObject, FieldError } from 'react-hook-form';

interface OwnProps {
  name: string;
  label: string;
  hasValue?: boolean;
  errors?: NestDataObject<Record<string, any>, FieldError>;
  componentRef: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null,
  ) => void;
}

type Props = OwnProps & React.HTMLProps<HTMLInputElement>;

export const TextInput: React.FC<Props> = ({
  label,
  componentRef,
  name,
  className,
  errors,
  hasValue,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const error = errors && errors[name];

  const shouldTransformLabel = isFocused || hasValue;

  const inputClassName = shouldTransformLabel
    ? 'input input--focused'
    : 'input';

  const labelClassName = shouldTransformLabel
    ? 'input__label u-t__fontSize--base input__label--focused'
    : 'input__label u-t__fontSize--base';

  return (
    <div className={inputClassName}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        ref={componentRef}
        className={`input__control input__control--text u-t__fontSize--base ${className}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      <span className="input__deco--text" />
      {error && (
        <div className="input__error u-t__fontSize--xsmall u-o-6 u-t__fontWeight--bold">
          {error.message}
        </div>
      )}
    </div>
  );
};
