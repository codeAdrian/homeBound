import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';

import { CustomHook } from 'models';
import { getUserData } from 'modules/user';
import {
  ContactsState,
  getUserContacts,
  getContactsState,
  addUserContact,
  ContactsActionTypes,
  removeUserContact,
} from 'modules/contacts';

export interface ContactInput {
  date: Date;
  name: string;
  phoneNumber: string;
}

interface Api {
  getContacts: VoidFunction;
  addContact: (contact: ContactInput) => void;
  removeContact: (id: string) => void;
}

export const useContactsServices: CustomHook<ContactsState, Api> = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(getUserData);
  const contacts = useSelector(getContactsState);

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
        addUserContact(userData, contact);
        await getContacts();
      }
    },
    [userData, getContacts],
  );

  const removeContact = React.useCallback(
    async (id: string) => {
      if (userData) {
        removeUserContact(userData, id);
        await getContacts();
      }
    },
    [getContacts, userData],
  );

  const api = React.useMemo(
    () => ({
      getContacts,
      addContact,
      removeContact,
    }),
    [addContact, getContacts, removeContact],
  );

  React.useEffect(() => {
    getContacts();
  }, [getContacts]);

  return [contacts, api];
};
