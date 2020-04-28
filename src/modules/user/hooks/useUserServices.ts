import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomHook } from 'models';
import {
  getUserData,
  UserActionTypes,
  createUserDocument,
  UserState,
  updateUserDocument,
} from 'modules/user';

interface Api {
  updateUserData: (user: firebase.UserInfo) => void;
  resetUserData: VoidFunction;
  updateUserProfile: (
    user: Partial<firebase.UserInfo>,
    value: Partial<firebase.UserInfo>,
  ) => void;
}

export const useUserServices: CustomHook<UserState, Api> = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserData);

  const updateUserProfile = React.useCallback(
    async (userData, value) => {
      const payload = await updateUserDocument(userData, value);
      dispatch({
        type: UserActionTypes.Success,
        payload,
      });
    },
    [dispatch],
  );

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
      updateUserProfile,
      updateUserData,
      resetUserData,
    }),
    [resetUserData, updateUserData, updateUserProfile],
  );

  return [state, api];
};
