import { createSelector } from 'reselect';

import { ApplicationState } from 'modules/redux-store';

export const getContactsState = () =>
  createSelector(
    [(state: ApplicationState) => state.contacts],
    (contacts) => contacts,
  );
