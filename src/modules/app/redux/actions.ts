import { AppActionTypes, AppVariables } from 'modules/app';
import { ActionUnion, createAction } from 'modules/redux-store';

export const AppActions = {
  Request: () => createAction(AppActionTypes.Request),

  Success: (settings: AppVariables) =>
    createAction(AppActionTypes.Success, settings),

  Error: (error?: string) => createAction(AppActionTypes.Error, error),
};

export type AppActions = ActionUnion<typeof AppActions>;
