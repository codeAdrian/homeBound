import { ScoreActionTypes, UserScore } from 'modules/score';
import { ActionUnion, createAction } from 'modules/redux-store';

export const SettingsActions = {
  Request: () => createAction(ScoreActionTypes.Request),

  Success: (settings: UserScore) =>
    createAction(ScoreActionTypes.Success, settings),

  Error: (error?: string) => createAction(ScoreActionTypes.Error, error),
};

export type ScoreActions = ActionUnion<typeof SettingsActions>;
