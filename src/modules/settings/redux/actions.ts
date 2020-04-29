import { SettingsActionTypes, UserSettings } from 'modules/settings';
import { ActionUnion, createAction } from 'modules/redux-store';

export const SettingsActions = {
  Request: () => createAction(SettingsActionTypes.Request),

  Success: (settings: UserSettings) =>
    createAction(SettingsActionTypes.Success, settings),

  Error: (error?: string) => createAction(SettingsActionTypes.Error, error),
  Reset: () => createAction(SettingsActionTypes.Reset),
};

export type SettingsActions = ActionUnion<typeof SettingsActions>;
