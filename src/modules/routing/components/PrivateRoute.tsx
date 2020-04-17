import * as React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useUserServices } from 'modules/user';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const [{ userData }] = useUserServices();

  return isEmpty(userData) ? <Redirect to="/login" /> : <Route {...props} />;
};

export { PrivateRoute };
