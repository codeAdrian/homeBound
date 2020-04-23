import { ContactsActionTypes, UserContact } from 'modules/contacts';
import { ActionUnion, createAction } from 'modules/redux-store';

export const ContactsActions = {
  Request: () => createAction(ContactsActionTypes.Request),

  Success: (contacts: UserContact[]) =>
    createAction(ContactsActionTypes.Success, contacts),

  Error: (error?: string) => createAction(ContactsActionTypes.Error, { error }),
  Reset: () => createAction(ContactsActionTypes.Reset),
};

export type ContactsActions = ActionUnion<typeof ContactsActions>;
