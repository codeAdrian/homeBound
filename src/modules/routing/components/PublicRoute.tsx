import * as React from 'react';
import { isEmpty } from 'lodash';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useIsOnline } from 'react-use-is-online';

import { useUserServices } from 'modules/user';
import { SplashScreen, Offline } from 'components';

const PublicRoute: React.FC<RouteProps> = (props) => {
  const [{ userData, isLoading }] = useUserServices();
  const { isOffline } = useIsOnline();
  const [ready, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsReady(true), 2000);
  }, []);

  if (isOffline) return <Offline />;

  if ((!userData && isLoading) || !ready) return <SplashScreen />;

  return isEmpty(userData) ? <Route {...props} /> : <Redirect to="/" />;
};

export { PublicRoute };
