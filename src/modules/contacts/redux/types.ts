enum GetContactsActionTypes {
  Request = 'CONTACTS_DATA_REQUEST',
  Success = 'CONTACTS_DATA_SUCCESS',
  Error = 'CONTACTS_DATA_ERROR',
  Reset = 'CONTACTS_DATA_RESET',
}

export const ContactsActionTypes = {
  ...GetContactsActionTypes,
};
