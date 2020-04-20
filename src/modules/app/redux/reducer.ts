import { AppActionTypes, AppActions } from 'modules/app';

export type App = any;

export interface Theme {
  color: string;
  showNav: boolean;
  shapeClass: string;
}

export interface AppVariables {
  app: App;
  theme: Theme;
}

export type AppState = AppVariables & {
  isLoading: boolean;
  error?: string;
};

const INITIAL_STATE: AppState = {
  app: undefined,
  theme: {
    showNav: false,
    color: '#FAC936',
    shapeClass: '',
  },
  isLoading: false,
  error: undefined,
};

export const appReducer = (
  state: AppState = INITIAL_STATE,
  action: AppActions,
): AppState => {
  switch (action.type) {
    case AppActionTypes.Request:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case AppActionTypes.Success:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case AppActionTypes.Error:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state || INITIAL_STATE;
  }
};
