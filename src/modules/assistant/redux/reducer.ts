import { Paginator } from 'twilio-chat/lib/interfaces/paginator';
import { Message } from 'twilio-chat/lib/message';

import { AssistantActions } from './actions';
import { AssistantActionTypes } from './types';

export interface AssistantState {
  messages?: Paginator<Message>;
  token: string;
  isLoading: boolean;
  error?: string;
}

const INITIAL_STATE: AssistantState = {
  messages: undefined,
  token: '',
  isLoading: false,
  error: undefined,
};

export const assistantReducer = (
  state: AssistantState = INITIAL_STATE,
  action: AssistantActions,
): AssistantState => {
  switch (action.type) {
    case AssistantActionTypes.Request:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case AssistantActionTypes.Success:
      return {
        ...state,
        messages: action.payload.messages,
        isLoading: false,
      };
    case AssistantActionTypes.UpdateToken:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
      };
    case AssistantActionTypes.Error:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state || INITIAL_STATE;
  }
};
