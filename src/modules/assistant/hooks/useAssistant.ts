import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Client } from 'twilio-chat';
import { Channel } from 'twilio-chat/lib/channel';
import { Message } from 'twilio-chat/lib/message';
import { Paginator } from 'twilio-chat/lib/interfaces/paginator';

import { CustomHook } from 'models';
import { FirebaseService } from 'modules/firebase';
import { getUserData } from 'modules/user';

import { getAssistantData, AssistantActions } from '../redux';

interface Api {
  postMessage: (message: string) => Promise<void>;
}

interface AssistantState {
  messages?: Paginator<Message>;
  token: string;
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

  const subscribeToChannel = useCallback(async () => {
    if (!client.current) {
      client.current = await Client.create(state.token);
    }

    const createUserChannel = functions.httpsCallable('createUserChannel');
    const freshChannel = await createUserChannel({
      userId: userData?.uid,
    });

    channel.current = await client.current.getChannelBySid(freshChannel.data);
    channel.current.join();
  }, [state.token, userData, functions]);

  const unSubcribeFromChannel = useCallback(() => {
    channel.current?.leave();
    const removeUserChannel = functions.httpsCallable('removeUserChannel');
    removeUserChannel({
      channelId: channel.current?.sid,
    });
  }, [functions]);

  const getUserMessages = useCallback(async () => {
    dispatch(AssistantActions.Request());
    const messages = await channel.current?.getMessages();
    messages
      ? dispatch(AssistantActions.Success(messages))
      : dispatch(AssistantActions.Error(messages));
  }, [dispatch]);

  useEffect(() => {
    if (state.token) {
      getUserMessages();
      subscribeToChannel();
    }
  }, [state.token, getUserMessages, subscribeToChannel]);

  useEffect(() => {
    return () => {
      unSubcribeFromChannel();
    };
  }, [unSubcribeFromChannel]);

  const postMessage = useCallback(async (message: string) => {
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
