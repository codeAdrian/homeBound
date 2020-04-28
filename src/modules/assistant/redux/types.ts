enum GetAssistantActionTypes {
  Request = 'ASSISTANT_REQUEST',
  Success = 'ASSISTANT_SUCCESS',
  Error = 'ASSISTANT_ERROR',
  UpdateToken = 'ASSISTANT_UPDATE_TOKEN',
}

export const AssistantActionTypes = {
  ...GetAssistantActionTypes,
};
