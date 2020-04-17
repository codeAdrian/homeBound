import { SettingsState } from 'modules/settings';
import { UserState } from 'modules/user';
import { ScoreState } from 'modules/score';

export interface ApplicationState {
  user: UserState;
  settings: SettingsState;
  score: ScoreState;
}
