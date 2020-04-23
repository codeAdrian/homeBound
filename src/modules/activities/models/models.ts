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
