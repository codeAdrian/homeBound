import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from 'modules/routing';
import { Dashboard, Login, SignUp, Welcome } from 'views';
import { useAuthData } from 'modules/user';

const Placeholder: React.FC = () => <div>Placeholder</div>;

export const Routing: React.FC = () => {
  useAuthData();

  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/welcome" component={Welcome} />
      <Route component={Placeholder} />
    </Switch>
  );
};
