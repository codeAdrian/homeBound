import { createSelector } from 'reselect';

import { ApplicationState } from 'modules/redux-store';

export const getUserSettings = () =>
  createSelector(
    [(state: ApplicationState) => state.settings],
    (settings) => settings,
  );
