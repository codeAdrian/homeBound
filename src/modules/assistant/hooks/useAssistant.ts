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
  postMessage: (event: React.MouseEvent<HTMLDivElement>) => Promise<void>;
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

  const onReceiveMessage = useCallback(
    async (message: Message) => {
      console.log(message);
      dispatch(AssistantActions.Request());
      const messages = await channel.current?.getMessages();
      messages
        ? dispatch(AssistantActions.Success(messages))
        : dispatch(AssistantActions.Error(messages));
    },
    [dispatch],
  );

  const subscribeToChannel = useCallback(async () => {
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
      channel.current.sendMessage('Hi');
    }

    channel.current.on('messageAdded', onReceiveMessage);
  }, [state.token, userData, functions, onReceiveMessage]);

  const unSubcribeFromChannel = useCallback(() => {
    channel.current?.leave();
    const removeUserChannel = functions.httpsCallable('removeUserChannel');
    removeUserChannel({
      channelId: channel.current?.sid,
    });
  }, [functions]);

  useEffect(() => {
    if (state.token) {
      subscribeToChannel();
    }

    return () => {
      unSubcribeFromChannel();
    };
  }, [state.token, unSubcribeFromChannel, subscribeToChannel]);

  const postMessage = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      const { value = 'I need more help' } = event.currentTarget.dataset || {};
      channel.current?.sendMessage(value);
    },
    [],
  );

  const api = useMemo(
    () => ({
      postMessage,
    }),
    [postMessage],
  );

  return [state, api];
};
