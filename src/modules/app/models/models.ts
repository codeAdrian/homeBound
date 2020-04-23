export interface Theme {
  color: string;
  showNav: boolean;
  shapeClass: string;
}

export interface AppVariables {
  theme: Theme;
}

export type AppState = AppVariables & {
  isLoading: boolean;
  error?: string;
};
