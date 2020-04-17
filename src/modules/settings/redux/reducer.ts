import { SettingsActionTypes, SettingsActions } from 'modules/settings';

export type UserSettings = { [key: string]: boolean };

export interface SettingsState {
  isLoading: boolean;
  userSettings?: UserSettings;
  error?: string;
}

const INITIAL_STATE: SettingsState = {
  userSettings: undefined,
  isLoading: false,
  error: undefined,
};

export const settingsReducer = (
  state: SettingsState = INITIAL_STATE,
  action: SettingsActions,
): SettingsState => {
  switch (action.type) {
    case SettingsActionTypes.Request:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case SettingsActionTypes.Success:
      return {
        ...state,
        userSettings: action.payload,
        isLoading: false,
      };
    case SettingsActionTypes.Error:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case SettingsActionTypes.Reset:
      return INITIAL_STATE;
    default:
      return state || INITIAL_STATE;
  }
};
