import { createSelector } from 'reselect';

import { ApplicationState } from 'modules/redux-store';

export const getUserData = () =>
  createSelector(
    ({ user }: ApplicationState) => user,
    (user) => user,
  );
