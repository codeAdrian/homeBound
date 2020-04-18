import { createSelector } from 'reselect';

import { ApplicationState } from 'modules/redux-store';

export const getActivitiesState = () =>
  createSelector(
    [(state: ApplicationState) => state.activities],
    (activities) => activities,
  );
