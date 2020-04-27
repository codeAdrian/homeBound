import { ActionUnion, createAction } from 'modules/redux-store';
import { Message } from 'modules/contacts';

import { AssistantActionTypes } from './types';

export const AssistantActions = {
  Request: () => createAction(AssistantActionTypes.Request),

  Success: (messages: Message[]) =>
    createAction(AssistantActionTypes.Success, { messages }),

  Error: (error?: string) =>
    createAction(AssistantActionTypes.Error, { error }),
};

export type AssistantActions = ActionUnion<typeof AssistantActions>;
