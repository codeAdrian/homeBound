import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Client } from 'twilio-chat';

import { CustomHook } from 'models';
import { FirebaseService } from 'modules/firebase';
import { getUserData } from 'modules/user';
import { Message } from 'modules/contacts';

import { getAssistantData, AssistantActions } from '../redux';

interface Api {
  getUserMessages: () => Promise<void>;
  postMessage: (message: string) => Promise<void>;
}

interface AssistantState {
  messages: Message[];
}

export const useAssistant: CustomHook<AssistantState, Api> = () => {
  const functions = FirebaseService.FunctionsProvider;
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserData);
  const state = useSelector(getAssistantData);

  useEffect(() => {
    const initUserChannel = async () => {
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
  }, [userData, functions]);

  const getUserMessages = useCallback(async () => {
    dispatch(AssistantActions.Request());
    const getUserMessages = functions.httpsCallable('getUserMessages');
    const { data } = await getUserMessages({
      userId: userData?.uid,
    });

    const messages = JSON.parse(data);
    typeof messages === 'string'
      ? dispatch(AssistantActions.Error(messages))
      : dispatch(AssistantActions.Success(messages));
  }, [dispatch, userData, functions]);

  const postMessage = useCallback(
    async (message: string) => {
      Client.create('cbd').
      // const postUserMessage = functions.httpsCallable('postUserMessage');
      // const { data } = await postUserMessage({
      //   userId: userData?.uid,
      //   message,
      // });
    },
    [userData, functions],
  );

  const api = useMemo(
    () => ({
      postMessage,
      getUserMessages,
    }),
    [postMessage, getUserMessages],
  );

  return [state, api];
};
