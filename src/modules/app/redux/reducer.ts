import { AppActionTypes, AppActions } from 'modules/app';

export type App = any;

export interface AppVariables {
  app: App;
  themeColor: string;
}

export type AppState = AppVariables & {
  isLoading: boolean;
  error?: string;
};

const INITIAL_STATE: AppState = {
  app: undefined,
  themeColor: '#FAC936',
  isLoading: false,
  error: undefined,
};

export const appReducer = (
  state: AppState = INITIAL_STATE,
  action: AppActions,
): AppState => {
  console.log({ ...state, action });
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
        themeColor: action.payload.themeColor,
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
