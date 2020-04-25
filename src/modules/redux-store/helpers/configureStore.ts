import { combineReducers, createStore } from 'redux';

import { activitiesReducer } from 'modules/activities';
import { appReducer } from 'modules/app';
import { contactsReducer } from 'modules/contacts';
import { scoreReducer } from 'modules/score';
import { settingsReducer } from 'modules/settings';
import { userReducer } from 'modules/user';

export const configureStore = () => {
  const persistedRootReducer = {
    user: userReducer,
    settings: settingsReducer,
    score: scoreReducer,
    activities: activitiesReducer,
    contacts: contactsReducer,
    app: appReducer,
  };

  const store = createStore(combineReducers(persistedRootReducer));

  return store;
};
