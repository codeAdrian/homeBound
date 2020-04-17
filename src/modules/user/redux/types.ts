enum GetUserActionTypes {
  Request = 'USER_DATA_REQUEST',
  Success = 'USER_DATA_SUCCESS',
  Error = 'USER_DATA_ERROR',
  Reset = 'USER_DATA_RESET',
}

export const UserActionTypes = {
  ...GetUserActionTypes,
};
