enum GetScoreActionTypes {
  Request = 'SCORES_DATA_REQUEST',
  Success = 'SCORES_DATA_SUCCESS',
  Error = 'SCORES_DATA_ERROR',
}

export const ScoreActionTypes = {
  ...GetScoreActionTypes,
};
