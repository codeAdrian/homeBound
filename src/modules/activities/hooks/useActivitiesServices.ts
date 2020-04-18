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

type State = ActivitiesState;

interface Api {
  getActivities: VoidFunction;
  addActivity: (activity: any) => void;
  removeActivity: (id: string) => void;
  completeActivity: (id: string) => void;
}

export const useActivitiesServices = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserData());
  const activities = useSelector(getActivitiesState());

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
    async (activity: any) => {
      if (userData) {
        await addUserActivity(userData, activity);
        await getActivities();
      }
    },
    [userData, getActivities],
  );

  const removeActivity = React.useCallback(
    async (id: string) => {
      if (userData) {
        await removeUserActivity(userData, id);
        await getActivities();
      }
    },
    [getActivities, userData],
  );

  const completeActivity = React.useCallback(
    async (id: string) => {
      if (userData) {
        await completeUserActivity(userData, id);
        await removeActivity(id);
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

  return [activities, api] as [State, Api];
};
