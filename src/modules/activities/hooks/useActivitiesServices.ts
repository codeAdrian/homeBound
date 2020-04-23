import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';

import { getUserData } from 'modules/user';
import {
  ActivitiesState,
  getUserActivities,
  getActivitiesState,
  addUserActivity,
  ActivitiesActionTypes,
  removeUserActivity,
  completeUserActivity,
} from 'modules/activities';
import { CustomHook } from 'models';

export interface ActivityInput {
  date: Date;
  title: string;
  score: number;
  style: number;
}

interface Api {
  getActivities: VoidFunction;
  addActivity: (activity: ActivityInput) => void;
  removeActivity: (id: string) => void;
  completeActivity: (id: string) => void;
}

export const useActivitiesServices: CustomHook<ActivitiesState, Api> = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserData);
  const activities = useSelector(getActivitiesState);

  const getActivities = React.useCallback(async () => {
    if (!userData) return;
    dispatch({
      type: ActivitiesActionTypes.Request,
    });

    const payload = await getUserActivities(userData);

    dispatch({
      type: ActivitiesActionTypes.Success,
      payload: payload,
    });
  }, [dispatch, userData]);

  const addActivity = React.useCallback(
    async (activity: ActivityInput) => {
      if (userData) {
        await addUserActivity(userData, activity);
        getActivities();
      }
    },
    [userData, getActivities],
  );

  const removeActivity = React.useCallback(
    async (id: string) => {
      if (userData) {
        await removeUserActivity(userData, id);
        getActivities();
      }
    },
    [getActivities, userData],
  );

  const completeActivity = React.useCallback(
    async (id: string) => {
      if (userData) {
        await completeUserActivity(userData, id);
        removeActivity(id);
      }
    },
    [userData, removeActivity],
  );

  const api = React.useMemo(
    () => ({
      completeActivity,
      getActivities,
      addActivity,
      removeActivity,
    }),
    [addActivity, getActivities, removeActivity, completeActivity],
  );

  React.useEffect(() => {
    getActivities();
  }, [getActivities]);

  return [activities, api];
};
