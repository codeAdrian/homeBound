import React from 'react';

interface Props {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  className: string;
}

export const HEADING = {
  PRIMARY: {
    XLARGE: {
      BOLD:
        'heading u-t__fontFamily--primary u-t__fontSize--xlarge u-t__fontWeight--bold ',
    },
  },

  SECONDARY: {
    SMALL: {
      BOLD:
        'heading u-t__fontFamily--secondary u-t__fontSize--small u-t__fontWeight--bold ',
    },
    XLARGE: {
      BOLD:
        'heading u-t__fontFamily--secondary u-t__fontSize--xlarge u-t__fontWeight--bold ',
    },
  },
};

export const Heading: React.FC<Props> = ({ children, tag: Tag, ...rest }) => {
  return <Tag {...rest}>{children}</Tag>;
};
