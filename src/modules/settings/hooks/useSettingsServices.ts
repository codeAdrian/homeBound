import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getUserDocumentSettings,
  updateUserSettings,
  SettingsActionTypes,
  getUserSettings,
  SettingsState,
} from 'modules/settings';

type State = SettingsState;

interface Api {
  getSettings: (userData: firebase.UserInfo) => void;
  resetSettings: VoidFunction;
  updateSettings: (
    userData: firebase.UserInfo,
    updatedValue: { [key: string]: boolean },
  ) => Promise<void>;
}

export const useSettingsServices = () => {
  const dispatch = useDispatch();
  const settings = useSelector(getUserSettings());

  const resetSettings = React.useCallback(() => {
    dispatch({ type: SettingsActionTypes.Reset });
  }, [dispatch]);

  const getSettings = React.useCallback(
    async (userData?: firebase.UserInfo) => {
      if (!userData) return;
      dispatch({ type: SettingsActionTypes.Request });
      const updatedSettings = await getUserDocumentSettings(userData);
      dispatch({ type: SettingsActionTypes.Success, payload: updatedSettings });
    },
    [dispatch],
  );

  const updateSettings = React.useCallback(
    async (
      userData?: firebase.UserInfo,
      updatedValue?: { [key: string]: boolean },
    ) => {
      if (!userData) return;
      await updateUserSettings(userData, updatedValue);
    },
    [],
  );

  const api = React.useMemo(
    () => ({
      getSettings,
      updateSettings,
      resetSettings,
    }),
    [getSettings, resetSettings, updateSettings],
  );

  const state = settings;

  return [state, api] as [State, Api];
};
