import { useCallback } from 'react';

import { useUserServices } from 'modules/user';
import { useSettingsServices } from 'modules/settings';

export const useAuthStateChange = () => {
  const [, api] = useSettingsServices();
  const [, { updateUserData, resetUserData }] = useUserServices();

  const { getSettings, resetSettings } = api;

  const handleAuthChange = useCallback(
    async (userAuth) => {
      if (userAuth) {
        updateUserData(userAuth);
        getSettings(userAuth);
        return;
      }

      resetSettings();
      resetUserData();
    },
    [getSettings, resetSettings, resetUserData, updateUserData],
  );

  return handleAuthChange;
};
