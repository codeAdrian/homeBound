import * as React from 'react';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { getUserData } from 'modules/user';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { userData } = useSelector(getUserData());

  return isEmpty(userData) ? <Redirect to="/login" /> : <Route {...props} />;
};

export { PrivateRoute };
