import React from 'react';

interface OwnProps {
  className?: string;
  icon?: React.ReactNode;
  value?: string;
}

type Props = OwnProps & React.HTMLAttributes<HTMLButtonElement>;

export const BUTTON = {
  SQUARE: {
    GHOST: {
      MIXED: 'button button--ghost button--size-mixed button--square',
    },
    CTA: {
      MIXED: {
        GLOW:
          'button button--cta button--glow-cta button--size-mixed button--square',
      },
    },
  },
  PILL: {
    PRIMARY: {
      BASE:
        'button button--primary button--block button--pill button--size-base u-t__fontSize--small',
    },

    CTA: {
      BASE: {
        GLOW:
          'button button--cta button--glow-cta button--block button--pill button--size-base u-t__fontSize--small',
      },
    },
  },
  COMBINED: {
    PRIMARY: {
      BASE: {
        TOP:
          'button button--primary button--combined button--block button--combined button--top button--size-xlarge u-t__fontSize--small',
        BOTTOM:
          'button button--primary button--combined button--block button--combined button--bottom button--size-xlarge u-t__fontSize--small',
      },
    },
  },
  ROUNDED: {
    CTA: {
      SMALL:
        'button button--cta button--rounded button--size-xxsmall u-t__fontSize--small',
      LARGE: {
        GLOW:
          'button button--cta button--rounded button--glow-cta button--size-small u-t__fontSize--small',
      },
    },
  },
};

export const Button: React.FC<Props> = ({ children, icon, ...rest }) => {
  return (
    <button {...rest}>
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
};
