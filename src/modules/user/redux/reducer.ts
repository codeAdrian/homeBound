import { UserActions, UserActionTypes } from 'modules/user';

export interface UserData extends firebase.UserInfo {
  settings?: {
    [key: string]: boolean;
  };
}

export interface UserState {
  isLoading: boolean;
  userData?: UserData;
  error?: string;
}

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
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state || INITIAL_STATE;
  }
};
