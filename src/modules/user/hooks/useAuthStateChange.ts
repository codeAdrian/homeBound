import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createUserDocument, UserActionTypes } from 'modules/user';
import {
  SettingsActionTypes,
  getUserDocumentSettings,
  UserSettings,
} from 'modules/settings';

export const useAuthStateChange = () => {
  const dispatch = useDispatch();

  const handleAuthData = useCallback(
    (payload: firebase.User | {}) => ({
      type: UserActionTypes.Success,
      payload,
    }),
    [],
  );

  const handleSettingsData = useCallback(
    (payload: UserSettings) => ({
      type: SettingsActionTypes.Success,
      payload,
    }),
    [],
  );

  const handleAuthChange = useCallback(
    async (userAuth) => {
      dispatch({ type: UserActionTypes.Request });
      dispatch({ type: SettingsActionTypes.Request });

      console.log(userAuth);

      if (userAuth) {
        const userRef = await createUserDocument(userAuth);
        const settingsRef = await getUserDocumentSettings(userAuth.uid);

        dispatch(handleAuthData(userRef));
        dispatch(handleSettingsData(settingsRef));
      } else {
        dispatch(handleAuthData({}));
        dispatch(handleSettingsData({}));
      }
    },
    [dispatch, handleAuthData, handleSettingsData],
  );

  return handleAuthChange;
};
