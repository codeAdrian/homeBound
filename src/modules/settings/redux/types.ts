enum GetSettingsActionTypes {
  Request = 'SETTINGS_DATA_REQUEST',
  Success = 'SETTINGS_DATA_SUCCESS',
  Error = 'SETTINGS_DATA_ERROR',
  Reset = 'SETTINGS_DATA_RESET',
}

export const SettingsActionTypes = {
  ...GetSettingsActionTypes,
};
