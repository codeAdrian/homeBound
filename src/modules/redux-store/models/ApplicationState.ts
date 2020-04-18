import { SettingsState } from 'modules/settings';
import { UserState } from 'modules/user';
import { ScoreState } from 'modules/score';
import { ActivitiesState } from 'modules/activities';
import { ContactsState } from 'modules/contacts';

export interface ApplicationState {
  user: UserState;
  settings: SettingsState;
  score: ScoreState;
  activities: ActivitiesState;
  contacts: ContactsState;
}
