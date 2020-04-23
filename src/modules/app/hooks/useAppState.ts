import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomHook } from 'models';
import { Theme, getAppConfig, AppActionTypes, AppState } from 'modules/app';

interface Api {
  setAppTheme: (theme: Theme) => void;
}

export const useAppState: CustomHook<AppState, Api> = () => {
  const dispatch = useDispatch();
  const state = useSelector(getAppConfig);

  const setAppTheme = React.useCallback(
    (theme: Theme) => {
      dispatch({ type: AppActionTypes.Request });
      dispatch({ type: AppActionTypes.Success, payload: { theme } });
    },
    [dispatch],
  );

  const api = React.useMemo(
    () => ({
      setAppTheme,
    }),
    [setAppTheme],
  );

  return [state, api];
};
