import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getUserData,
  UserActionTypes,
  createUserDocument,
  UserState,
} from 'modules/user';

export const useUserServices = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserData());

  type State = UserState;

  interface Api {
    updateUserData: (user: firebase.UserInfo) => void;
    resetUserData: VoidFunction;
  }

  const updateUserData = React.useCallback(
    async (userData) => {
      dispatch({ type: UserActionTypes.Request });
      const payload = await createUserDocument(userData);
      dispatch({
        type: UserActionTypes.Success,
        payload,
      });
    },
    [dispatch],
  );

  const resetUserData = React.useCallback(() => {
    dispatch({ type: UserActionTypes.Reset });
  }, [dispatch]);

  const state = user;

  const api = React.useMemo(
    () => ({
      updateUserData,
      resetUserData,
    }),
    [resetUserData, updateUserData],
  );

  return [state, api] as [State, Api];
};
