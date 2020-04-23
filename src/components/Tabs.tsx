import React from 'react';

interface Props {
  contentMain: React.ReactNode;
  contentSecondary: React.ReactNode;
  titleMain: string;
  titleSecondary: string;
  mode?: 'cta';
}

export const Tabs: React.FC<Props> = ({
  contentMain,
  contentSecondary,
  titleMain,
  titleSecondary,
  mode,
}) => {
  const [mainTabActive, setMainTabActive] = React.useState(true);

  const buttonMainClassName = mainTabActive ? 'tabs__button--active' : '';
  const buttonSecondaryClassName = !mainTabActive ? 'tabs__button--active' : '';

  return (
    <aside>
      <nav
        className={`tabs__nav u-sb-28 ${
          mode === 'cta' ? 'tabs__nav--cta' : ''
        }`}
      >
        <button
          className={`tabs__button ${buttonMainClassName} button u-t__fontSize--xsmall u-t__fontWeight--medium`}
          onClick={() => setMainTabActive(true)}
        >
          <span>{titleMain}</span>
        </button>
        <button
          className={`tabs__button ${buttonSecondaryClassName} button u-t__fontSize--xsmall u-t__fontWeight--medium`}
          onClick={() => setMainTabActive(false)}
        >
          <span>{titleSecondary}</span>
        </button>
      </nav>
      <section>{mainTabActive ? contentMain : contentSecondary}</section>
    </aside>
  );
};
