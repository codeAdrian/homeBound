import { ContactsActionTypes, UserContact } from 'modules/contacts';
import { ActionUnion, createAction } from 'modules/redux-store';

export const ContactsActions = {
  Request: () => createAction(ContactsActionTypes.Request),

  Success: (settings: UserContact[]) =>
    createAction(ContactsActionTypes.Success, settings),

  Error: (error?: string) => createAction(ContactsActionTypes.Error, { error }),
  Reset: () => createAction(ContactsActionTypes.Reset),
};

export type ContactsActions = ActionUnion<typeof ContactsActions>;
