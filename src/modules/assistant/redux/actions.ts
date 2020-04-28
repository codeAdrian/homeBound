import { Paginator } from 'twilio-chat/lib/interfaces/paginator';
import { Message } from 'twilio-chat/lib/message';

import { ActionUnion, createAction } from 'modules/redux-store';

import { AssistantActionTypes } from './types';

export const AssistantActions = {
  Request: () => createAction(AssistantActionTypes.Request),

  Success: (messages?: Paginator<Message>) =>
    createAction(AssistantActionTypes.Success, { messages }),

  UpdateToken: (token: string) =>
    createAction(AssistantActionTypes.UpdateToken, { token }),

  Error: (error?: string) =>
    createAction(AssistantActionTypes.Error, { error }),
};

export type AssistantActions = ActionUnion<typeof AssistantActions>;
