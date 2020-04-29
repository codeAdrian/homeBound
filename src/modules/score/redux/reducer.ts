import { ScoreActionTypes, ScoreActions, ScoreState } from 'modules/score';

const INITIAL_STATE: ScoreState = {
  userScore: undefined,
  isLoading: false,
  error: undefined,
};

export const scoreReducer = (
  state: ScoreState = INITIAL_STATE,
  action: ScoreActions,
): ScoreState => {
  switch (action.type) {
    case ScoreActionTypes.Request:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case ScoreActionTypes.Success:
      return {
        ...state,
        userScore: { ...state.userScore, ...action.payload },
        isLoading: false,
      };
    case ScoreActionTypes.Error:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state || INITIAL_STATE;
  }
};
