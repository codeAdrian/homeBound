import * as React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useIsOnline } from 'react-use-is-online';

import { useUserServices } from 'modules/user';
import { SplashScreen, Offline } from 'components';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const [{ userData, isLoading }] = useUserServices();
  const { isOffline } = useIsOnline();
  const shouldDisplaySplashScreen = React.useMemo(
    () => !!userData?.uid && isLoading,
    [isLoading, userData],
  );

  if (isOffline) return <Offline />;

  if (shouldDisplaySplashScreen) return <SplashScreen />;

  return isEmpty(userData) ? <Redirect to="/login" /> : <Route {...props} />;
};

export { PrivateRoute };
