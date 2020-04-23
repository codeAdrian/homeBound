export type UserContact = {
  date: Date;
  name: string;
  id: string;
  phoneNumber: string;
};

export interface ContactsState {
  isLoading: boolean;
  userContacts?: UserContact[];
  error?: string;
}
