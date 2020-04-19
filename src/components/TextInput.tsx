import React from 'react';

interface OwnProps {
  label: string;
}

type Props = OwnProps & React.HTMLProps<any>;

export const TextInput: React.FC<Props> = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <input
        className="input__control input__control--text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      <span className="input__deco--text" />
    </div>
  );
};
