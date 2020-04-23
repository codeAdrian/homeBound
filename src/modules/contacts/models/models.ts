import { Timestamp } from 'util/time';

export type UserContact = {
  date: Timestamp;
  name: string;
  id: string;
  phoneNumber: string;
};

export interface ContactsState {
  isLoading: boolean;
  userContacts?: UserContact[];
  error?: string;
}
