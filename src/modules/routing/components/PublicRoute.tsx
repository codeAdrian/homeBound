import * as React from 'react';
import { isEmpty } from 'lodash';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useUserServices } from 'modules/user';
import { SplashScreen } from 'components';

const PublicRoute: React.FC<RouteProps> = (props) => {
  const [{ userData, isLoading }] = useUserServices();
  const [ready, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsReady(true), 2000);
  }, []);

  return isEmpty(userData) ? <Route {...props} /> : <Redirect to="/" />;
};

export { PublicRoute };
