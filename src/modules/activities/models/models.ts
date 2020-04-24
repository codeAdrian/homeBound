import { UserSettings } from 'modules/settings';

export type UserActivity = {
  date: Date;
  title: string;
  id: string;
  score: number;
  style: number;
};

export interface ActivitiesState {
  isLoading: boolean;
  userActivities?: UserActivity[];
  error?: string;
}

export interface Suggestion {
  value: string;
  label: string;
  restrictions?: UserSettings;
}
