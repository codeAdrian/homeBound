import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from 'modules/routing';
import { Dashboard, Login, SignUp } from 'views';
import { useAuthData } from 'modules/user';

const Placeholder = () => <div>Placeholder</div>;

export const Routing = () => {
  useAuthData();

  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/signup" component={SignUp} />
      <Route component={Placeholder} />
    </Switch>
  );
};
