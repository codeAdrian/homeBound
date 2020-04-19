import { createSelector } from 'reselect';

import { ApplicationState } from 'modules/redux-store';

export const getAppConfig = () =>
  createSelector([(state: ApplicationState) => state.app], (app) => app);
