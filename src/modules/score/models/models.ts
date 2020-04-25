import { UserActivity } from 'modules/activities';
export type ScoreHistory = {
  date: Date;
  title: string;
  score: number;
  style: string;
};

export type UserScore = {
  score: number;
  history: UserActivity[];
};

export interface ScoreState {
  isLoading: boolean;
  userScore?: UserScore;
  error?: string;
}
