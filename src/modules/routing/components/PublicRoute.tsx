import * as React from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { ApplicationState } from 'modules/redux-store';

const PublicRoute = (props: RouteProps) => {
  const user = useSelector(({ user }: ApplicationState) => user);

  return isEmpty(user.userData) ? <Route {...props} /> : <Redirect to="/" />;
};

export { PublicRoute };
