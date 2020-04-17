enum GetSettingsActionTypes {
  Request = 'SETTINGS_DATA_REQUEST',
  Success = 'SETTINGS_DATA_SUCCESS',
  Error = 'SETTINGS_DATA_ERROR',
}

export const SettingsActionTypes = {
  ...GetSettingsActionTypes,
};
