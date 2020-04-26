import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from 'modules/routing';
import {
  Dashboard,
  Login,
  SignUp,
  Welcome,
  Contacts,
  Activities,
  Assistant,
  NotFound,
} from 'views';
import { useAuthData } from 'modules/user';

export const Routing: React.FC = () => {
  useAuthData();

  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/welcome" component={Welcome} />
      <PrivateRoute exact path="/contacts" component={Contacts} />
      <PrivateRoute exact path="/activities" component={Activities} />
      <PrivateRoute exact path="/assistant" component={Assistant} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
