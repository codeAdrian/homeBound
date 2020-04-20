import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Theme, getAppConfig, AppActionTypes, AppState } from 'modules/app';

type State = AppState;

interface Api {
  setAppTheme: (theme: Theme) => void;
}

export const useAppState = () => {
  const dispatch = useDispatch();
  const state = useSelector(getAppConfig());

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

  return [state, api] as [State, Api];
};
