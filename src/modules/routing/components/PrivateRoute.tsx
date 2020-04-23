import * as React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useUserServices } from 'modules/user';
import { SplashScreen } from 'components';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const [{ userData, isLoading }] = useUserServices();
  const shouldDisplaySplashScreen = React.useMemo(
    () => !!userData?.uid && isLoading,
    [isLoading, userData],
  );

  if (shouldDisplaySplashScreen) return <SplashScreen />;

  return isEmpty(userData) ? <Redirect to="/login" /> : <Route {...props} />;
};

export { PrivateRoute };
