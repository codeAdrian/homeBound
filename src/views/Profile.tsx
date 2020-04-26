import React from 'react';

import { useUserServices } from 'modules/user';
import { useSettingsServices } from 'modules/settings/hooks';
import { useAppState } from 'modules/app';
import { ScoreTracker } from 'modules/score';
import { UpdateSettings } from 'modules/settings';

export const Profile = () => {
  const [{ userData }] = useUserServices();
  const [{ userSettings }] = useSettingsServices();
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
      <ScoreTracker mode="large" />
      <UpdateSettings />
    </section>
  );
};
