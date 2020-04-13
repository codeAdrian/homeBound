import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  createUserDocument,
  UserActionTypes,
  User as UserType,
} from 'modules/user';

export const useAuthStateChange = () => {
  const dispatch = useDispatch();

  const handleAuthData = useCallback(
    (payload: UserType | {}) => ({
      type: UserActionTypes.Success,
      payload,
    }),
    [],
  );

  const handleAuthChange = useCallback(
    async (userAuth) => {
      dispatch({ type: UserActionTypes.Request });

      if (userAuth) {
        const userRef = await createUserDocument(userAuth);
        dispatch(handleAuthData(userRef));
      } else {
        dispatch(handleAuthData({}));
      }
    },
    [dispatch, handleAuthData],
  );

  return handleAuthChange;
};
