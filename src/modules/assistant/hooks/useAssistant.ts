import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FirebaseService } from 'modules/firebase';
import { ApplicationState } from 'modules/redux-store';

export function useAssistant() {
  const { userData } = useSelector((state: ApplicationState) => state.user);
  useEffect(() => {
    const initUserChannel = async () => {
      const functions = FirebaseService.FunctionsProvider;

      const checkIfUserChannelExists = functions.httpsCallable(
        'checkIfUserChannelExists',
      );

      const { data } = await checkIfUserChannelExists({
        userId: userData?.uid,
      });

      if (!data) {
        const createUserChannel = functions.httpsCallable('createUserChannel');
        await createUserChannel({
          userId: userData?.uid,
        });
      }
    };

    initUserChannel();
  }, [userData]);
}
