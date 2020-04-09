import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

export const configureStore = () => {
  const persistedRootReducer = {};

  const store = createStore(
    combineReducers(persistedRootReducer),
    {},
    applyMiddleware(thunk),
  );

  return store;
};
