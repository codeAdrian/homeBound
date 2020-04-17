import * as React from 'react';
import { isEmpty } from 'lodash';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useUserServices } from 'modules/user';

const PublicRoute: React.FC<RouteProps> = (props) => {
  const [{ userData }] = useUserServices();

  return isEmpty(userData) ? <Route {...props} /> : <Redirect to="/" />;
};

export { PublicRoute };
