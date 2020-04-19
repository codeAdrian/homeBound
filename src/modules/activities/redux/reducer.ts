import { ActivitiesActionTypes, ActivitiesActions } from 'modules/activities';

export type UserActivity = {
  date: Date;
  title: string;
  id: string;
  score: number;
};

export interface ActivitiesState {
  isLoading: boolean;
  userActivities?: UserActivity[];
  error?: string;
}

const INITIAL_STATE: ActivitiesState = {
  userActivities: undefined,
  isLoading: false,
  error: undefined,
};

export const activitiesReducer = (
  state: ActivitiesState = INITIAL_STATE,
  action: ActivitiesActions,
): ActivitiesState => {
  switch (action.type) {
    case ActivitiesActionTypes.Request:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case ActivitiesActionTypes.Success:
      return {
        ...state,
        userActivities: action.payload,
        isLoading: false,
      };
    case ActivitiesActionTypes.Error:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case ActivitiesActionTypes.Reset:
      return INITIAL_STATE;
    default:
      return state || INITIAL_STATE;
  }
};
