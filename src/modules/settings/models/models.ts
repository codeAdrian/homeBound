export type UserSettings = { [key: string]: boolean };

export interface SettingsState {
  isLoading: boolean;
  userSettings?: UserSettings;
  error?: string;
}
