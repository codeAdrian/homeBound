import { AppActionTypes, AppActions, AppState } from 'modules/app';

const INITIAL_STATE: AppState = {
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
