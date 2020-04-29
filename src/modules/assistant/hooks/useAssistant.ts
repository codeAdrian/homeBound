import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Client } from 'twilio-chat';
import { Channel } from 'twilio-chat/lib/channel';
import { Message } from 'twilio-chat/lib/message';

import { getUserData } from 'modules/user';
import { FirebaseService } from 'modules/firebase';
import { CustomHook } from 'models';

import { AssistantActions, getAssistantData, AssistantState } from '../redux';

interface Api {
  postMessage: (message: string) => void;
}

export const useAssistant: CustomHook<AssistantState, Api> = () => {
  const functions = FirebaseService.FunctionsProvider;
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserData);
  const state = useSelector(getAssistantData);
  const client = useRef<Client>();
  const channel = useRef<Channel>();

  const getUserToken = useCallback(async () => {
    const getUserToken = functions.httpsCallable('getUserToken');
    const { data } = await getUserToken({
      identity: userData?.email,
    });

    dispatch(AssistantActions.UpdateToken(data));
  }, [dispatch, userData, functions]);

  useEffect(() => {
    getUserToken();
  }, [getUserToken]);

  const onReceiveMessage = useCallback(
    async (message: Message) => {
      if (message.body !== 'Hi') {
        dispatch(AssistantActions.Success(message));
      }
    },
    [dispatch],
  );

  const subscribeToChannel = useCallback(async () => {
    dispatch(AssistantActions.Request());
    if (!client.current) {
      client.current = await Client.create(state.token);
    }

    const createUserChannel = functions.httpsCallable('createUserChannel');
    const freshChannel = await createUserChannel({
      userId: userData?.uid,
    });

    channel.current = await client.current.getChannelBySid(freshChannel.data);
    if (channel.current.status !== 'joined') {
      await channel.current.join();
    }

    channel.current.sendMessage('Hi');
    channel.current.on('messageAdded', onReceiveMessage);
  }, [dispatch, state.token, userData, functions, onReceiveMessage]);

  const unSubcribeFromChannel = useCallback(() => {
    channel.current?.leave();
    const removeUserChannel = functions.httpsCallable('removeUserChannel');
    removeUserChannel({
      channelId: channel.current?.sid,
    });

    dispatch(AssistantActions.ClearReducer());
  }, [dispatch, functions]);

  useEffect(() => {
    if (state.token) {
      subscribeToChannel();
      return;
    }
  }, [state.token, subscribeToChannel]);

  useEffect(() => unSubcribeFromChannel, [unSubcribeFromChannel]);

  const postMessage = useCallback((message: string) => {
    channel.current?.sendMessage(message);
  }, []);

  const api = useMemo(
    () => ({
      postMessage,
    }),
    [postMessage],
  );

  return [state, api];
};
