import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAppConfig, AppActionTypes, AppState } from 'modules/app';

type State = AppState;

interface Api {
  setAppThemeColor: (themeColor: string) => void;
}

export const useAppState = () => {
  const dispatch = useDispatch();
  const state = useSelector(getAppConfig());

  const setAppThemeColor = React.useCallback(
    (themeColor: string) => {
      dispatch({ type: AppActionTypes.Request });
      dispatch({ type: AppActionTypes.Success, payload: { themeColor } });
    },
    [dispatch],
  );

  const api = React.useMemo(
    () => ({
      setAppThemeColor,
    }),
    [setAppThemeColor],
  );

  return [state, api] as [State, Api];
};
