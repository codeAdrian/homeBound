import React from 'react';

export const Letter: React.FC = ({ children }) => {
  return (
    <span className="letter u-t__fontSize--xlarge u-t__fontWeight--bold">
      {children}
    </span>
  );
};
