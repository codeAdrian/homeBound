import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';

import { getUserData } from 'modules/user';
import {
  ContactsState,
  getUserContacts,
  getContactsState,
  addUserContact,
  ContactsActionTypes,
  removeUserContact,
  getLastContacts,
  UserContact,
} from 'modules/contacts';

type State = ContactsState;

export interface ContactInput {
  date: Date;
  name: string;
  phoneNumber: string;
}

interface Api {
  getLastUserContacts: (n: number, data: any) => void;
  getContacts: VoidFunction;
  addContact: (contact: ContactInput) => void;
  removeContact: (id: string) => void;
}

export const useContactsServices = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserData());
  const contacts = useSelector(getContactsState());

  const getLastUserContacts = React.useCallback(
    async (n: number, successFunction: (data: any) => void) => {
      if (!userData) return;
      await getLastContacts(userData, n, {
        successFunction,
        errorFunction: () => false,
      });
    },
    [userData],
  );

  const getContacts = React.useCallback(async () => {
    if (!userData) return;
    dispatch({
      type: ContactsActionTypes.Request,
    });

    const payload = await getUserContacts(userData);

    dispatch({
      type: ContactsActionTypes.Success,
      payload: payload,
    });
  }, [dispatch, userData]);

  const addContact = React.useCallback(
    async (contact: ContactInput) => {
      if (userData) {
        await addUserContact(userData, contact);
        await getContacts();
      }
    },
    [userData, getContacts],
  );

  const removeContact = React.useCallback(
    async (id: string) => {
      if (userData) {
        await removeUserContact(userData, id);
        await getContacts();
      }
    },
    [getContacts, userData],
  );

  const api = React.useMemo(
    () => ({
      getLastUserContacts,
      getContacts,
      addContact,
      removeContact,
    }),
    [addContact, getContacts, removeContact, getLastUserContacts],
  );

  React.useEffect(() => {
    getContacts();
  }, [getContacts]);

  return [contacts, api] as [State, Api];
};
