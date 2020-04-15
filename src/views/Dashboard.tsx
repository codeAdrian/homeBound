import * as React from 'react';
import { useSelector } from 'react-redux';

import { LogOut, getUserData } from 'modules/user';
import { SplashSettings, getUserSettings } from 'modules/settings';
import { ApplicationState } from 'modules/redux-store';

const Dashboard = () => {
  const { userData } = useSelector((state: ApplicationState) =>
    getUserData()(state),
  );
  const { userSettings } = useSelector((state: ApplicationState) =>
    getUserSettings()(state),
  );

  return (
    <>
      <SplashSettings userSettings={userSettings} userData={userData} />
      <LogOut />
    </>
  );
};

export { Dashboard };
