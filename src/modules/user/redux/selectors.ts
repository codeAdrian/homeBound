import { createSelector } from 'reselect';

import { ApplicationState } from 'modules/redux-store';

export const getUserData = () =>
  createSelector([(state: ApplicationState) => state.user], (user) => user);
