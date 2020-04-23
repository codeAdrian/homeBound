export type ScoreHistory = {
  date: Date;
  title: string;
  score: number;
};

export type UserScore = {
  score: number;
  history: ScoreHistory[];
};

export interface ScoreState {
  isLoading: boolean;
  userScore?: UserScore;
  error?: string;
}
