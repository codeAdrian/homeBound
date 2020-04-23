import { ActivitiesActionTypes, UserActivity } from 'modules/activities';
import { ActionUnion, createAction } from 'modules/redux-store';

export const ActivitiesActions = {
  Request: () => createAction(ActivitiesActionTypes.Request),

  Success: (settings: UserActivity[]) =>
    createAction(ActivitiesActionTypes.Success, settings),

  Error: (error?: string) =>
    createAction(ActivitiesActionTypes.Error, { error }),
  Reset: () => createAction(ActivitiesActionTypes.Reset),
};

export type ActivitiesActions = ActionUnion<typeof ActivitiesActions>;
