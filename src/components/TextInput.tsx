import React from 'react';

interface OwnProps {
  name: string;
  label: string;
  hasValue?: boolean;
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
    </div>
  );
};
