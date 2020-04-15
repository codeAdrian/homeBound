import { SettingsState } from 'modules/settings';
import { UserState } from 'modules/user';

export interface ApplicationState {
  user: UserState;
  settings: SettingsState;
}
