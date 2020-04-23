import {
  ContactsActionTypes,
  ContactsActions,
  ContactsState,
} from 'modules/contacts';

const INITIAL_STATE: ContactsState = {
  userContacts: undefined,
  isLoading: false,
  error: undefined,
};

export const contactsReducer = (
  state: ContactsState = INITIAL_STATE,
  action: ContactsActions,
): ContactsState => {
  switch (action.type) {
    case ContactsActionTypes.Request:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case ContactsActionTypes.Success:
      return {
        ...state,
        userContacts: action.payload,
        isLoading: false,
      };
    case ContactsActionTypes.Error:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case ContactsActionTypes.Reset:
      return INITIAL_STATE;
    default:
      return state || INITIAL_STATE;
  }
};
