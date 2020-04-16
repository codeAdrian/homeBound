import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { getUserData } from 'modules/user';

const PublicRoute = (props: RouteProps) => {
  const { userData } = useSelector(getUserData());

  return !!userData ? <Route {...props} /> : <Redirect to="/" />;
};

export { PublicRoute };
