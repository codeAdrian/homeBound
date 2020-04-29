enum GetAssistantActionTypes {
  Request = 'ASSISTANT_REQUEST',
  Success = 'ASSISTANT_SUCCESS',
  Error = 'ASSISTANT_ERROR',
  UpdateToken = 'ASSISTANT_UPDATE_TOKEN',
  ClearReducer = 'ASSISTANT_CLEAR_REDUCER',
}

export const AssistantActionTypes = {
  ...GetAssistantActionTypes,
};
