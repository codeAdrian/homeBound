import { UserActions, UserActionTypes, UserState } from 'modules/user';

const INITIAL_STATE: UserState = {
  userData: undefined,
  isLoading: false,
  error: undefined,
};

export const userReducer = (
  state: UserState = INITIAL_STATE,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case UserActionTypes.Request:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case UserActionTypes.Success:
      return {
        ...state,
        userData: action.payload,
        isLoading: false,
      };
    case UserActionTypes.Error:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case UserActionTypes.Reset:
      return INITIAL_STATE;
    default:
      return state || INITIAL_STATE;
  }
};
