import { Message } from 'twilio-chat/lib/message';

import { ActionUnion, createAction } from 'modules/redux-store';

import { AssistantActionTypes } from './types';

export const AssistantActions = {
  Request: () => createAction(AssistantActionTypes.Request),

  Success: (message: Message) =>
    createAction(AssistantActionTypes.Success, { message }),

  UpdateToken: (token: string) =>
    createAction(AssistantActionTypes.UpdateToken, { token }),

  Error: (error?: string) =>
    createAction(AssistantActionTypes.Error, { error }),
};

export type AssistantActions = ActionUnion<typeof AssistantActions>;
