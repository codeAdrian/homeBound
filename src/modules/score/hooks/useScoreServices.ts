import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';

import { getUserData } from 'modules/user';
import {
  getUserScoreHistoryData,
  ScoreActionTypes,
  getUserScore,
  ScoreState,
} from 'modules/score';

type State = ScoreState;

interface Api {
  getScoreHistory: VoidFunction;
}

export const useScoreServices = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserData());
  const score = useSelector(getUserScore());

  const getScoreHistory = React.useCallback(async () => {
    if (!userData) return;
    dispatch({
      type: ScoreActionTypes.Request,
    });

    const history = await getUserScoreHistoryData(userData);

    dispatch({
      type: ScoreActionTypes.Success,
      payload: { history },
    });
  }, [dispatch, userData]);

  const api = { getScoreHistory };

  const state = score;

  return [state, api] as [State, Api];
};
