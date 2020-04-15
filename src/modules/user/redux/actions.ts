import { UserActionTypes, UserData } from 'modules/user';
import { ActionUnion, createAction } from 'modules/redux-store';

export const UserActions = {
  Request: () => createAction(UserActionTypes.Request),

  Success: (userData: UserData) =>
    createAction(UserActionTypes.Success, { ...userData }),

  Error: (error?: string) => createAction(UserActionTypes.Error, { error }),
};

export type UserActions = ActionUnion<typeof UserActions>;
