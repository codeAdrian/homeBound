import React from 'react';
import { Link } from 'react-router-dom';

import { useUserServices, UpdateProfile } from 'modules/user';
import { useAppState } from 'modules/app';
import { ScoreTracker } from 'modules/score';
import { UpdateSettings } from 'modules/settings';
import { ReactComponent as IconBack } from 'assets/icons/chevron_left.svg';

export const Profile = () => {
  const [{ userData }] = useUserServices();
  const [, { setAppTheme }] = useAppState();

  React.useEffect(() => {
    if (userData) {
      setAppTheme({
        color: '#F7CE53',
        shapeClass: 'app__deco--default',
        showNav: true,
      });
    }
  }, [setAppTheme, userData]);
  return (
    <section className="app__content">
      <aside className="u-f--spaceBetween u-f--spaceBetween--top u-sb-40">
        <Link to="/">
          <IconBack />
        </Link>
        <ScoreTracker mode="large" />
      </aside>
      <main>
        <UpdateProfile />
        <UpdateSettings />
      </main>
    </section>
  );
};
