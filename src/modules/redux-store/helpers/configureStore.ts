import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from 'modules/user';
import { settingsReducer } from 'modules/settings';

export const configureStore = () => {
  const persistedRootReducer = {
    user: userReducer,
    settings: settingsReducer,
  };

  const store = createStore(
    combineReducers(persistedRootReducer),
    {},
    applyMiddleware(thunk),
  );

  return store;
};
