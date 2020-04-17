import { createSelector } from 'reselect';

import { ApplicationState } from 'modules/redux-store';

export const getUserScore = () =>
  createSelector([(state: ApplicationState) => state.score], (score) => score);
