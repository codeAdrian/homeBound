import * as React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useUserServices } from 'modules/user';
import { SplashScreen } from 'components';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const [{ userData, isLoading }] = useUserServices();
  const [ready, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsReady(true), 2000);
  }, []);

  if ((!userData && isLoading) || !ready) return <SplashScreen />;

  return isEmpty(userData) ? <Redirect to="/login" /> : <Route {...props} />;
};

export { PrivateRoute };
