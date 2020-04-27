import { Message } from 'modules/contacts';

import { AssistantActions } from './actions';
import { AssistantActionTypes } from './types';

export interface AssistantState {
  messages: Message[];
  isLoading: boolean;
  error?: string;
}

const INITIAL_STATE: AssistantState = {
  messages: [],
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
        messages: { ...state.messages, ...action.payload.messages },
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
