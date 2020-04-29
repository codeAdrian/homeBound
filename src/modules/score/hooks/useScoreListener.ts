import { useDispatch } from 'react-redux';
import * as React from 'react';

import { getUserScoreData, ScoreActionTypes } from 'modules/score';

export const useScoreListener = (user?: firebase.UserInfo) => {
  const dispatch = useDispatch();

  const successFunction = React.useCallback(
    (payload) => {
      dispatch({
        type: ScoreActionTypes.Success,
        payload,
      });
    },
    [dispatch],
  );

  const errorFunction = React.useCallback(
    (error) => {
      dispatch({
        type: ScoreActionTypes.Error,
        error,
      });
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (user && user.uid) {
      dispatch({ type: ScoreActionTypes.Request });
      getUserScoreData(user, successFunction, errorFunction);
    }
  }, [dispatch, errorFunction, successFunction, user]);
};
