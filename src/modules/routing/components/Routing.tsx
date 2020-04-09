import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Placeholder = () => <div>Placeholder</div>;

export const Routing = () => {
  return (
    <Switch>
      <Route path={'/'} exact component={Placeholder} />
      <Route component={Placeholder} />
    </Switch>
  );
};
