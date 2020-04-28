import { AppState } from 'modules/app';
import { SettingsState } from 'modules/settings';
import { UserState } from 'modules/user';
import { ScoreState } from 'modules/score';
import { ActivitiesState } from 'modules/activities';
import { ContactsState } from 'modules/contacts';
import { AssistantState } from 'modules/assistant';

export interface ApplicationState {
  user: UserState;
  assistant: AssistantState;
  settings: SettingsState;
  score: ScoreState;
  activities: ActivitiesState;
  contacts: ContactsState;
  app: AppState;
}
