import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { activitiesReducer } from 'modules/activities';
import { appReducer } from 'modules/app';
import { contactsReducer } from 'modules/contacts';
import { scoreReducer } from 'modules/score';
import { settingsReducer } from 'modules/settings';
import { userReducer } from 'modules/user';

export const configureStore = () => {
  const rootReducer = {
    user: userReducer,
    settings: settingsReducer,
    score: scoreReducer,
    activities: activitiesReducer,
    contacts: contactsReducer,
    app: appReducer,
  };

  return process.env.NODE_ENV === 'production'
    ? createStore(combineReducers(rootReducer))
    : createStore(combineReducers(rootReducer), {}, composeWithDevTools());
};
