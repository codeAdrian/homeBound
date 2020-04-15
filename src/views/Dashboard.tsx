import * as React from 'react';
import { useSelector } from 'react-redux';

import { LogOut, getUserData } from 'modules/user';
import { SplashSettings } from 'modules/settings';
import { ApplicationState } from 'modules/redux-store';

const Dashboard = () => {
  const user = useSelector((state: ApplicationState) => getUserData()(state));

  console.log(user);

  return (
    <>
      <SplashSettings user={user} />
      <LogOut />
    </>
  );
};

export { Dashboard };
