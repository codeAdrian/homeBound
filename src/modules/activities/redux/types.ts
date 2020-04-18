enum GetActivitiesActionTypes {
  Request = 'ACTIVITIES_DATA_REQUEST',
  Success = 'ACTIVITIES_DATA_SUCCESS',
  Error = 'ACTIVITIES_DATA_ERROR',
  Reset = 'ACTIVITIES_DATA_RESET',
}

export const ActivitiesActionTypes = {
  ...GetActivitiesActionTypes,
};
