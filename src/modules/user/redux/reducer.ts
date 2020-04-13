import { User, UserActions, UserActionTypes } from 'modules/user';

export interface AllUsersState {
  userData: User | {};
  isLoading: boolean;
  error?: string;
}

const INITIAL_STATE: AllUsersState = {
  userData: {},
  isLoading: false,
  error: undefined,
};

export const userReducer = (
  state: AllUsersState = INITIAL_STATE,
  action: UserActions,
): AllUsersState => {
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
