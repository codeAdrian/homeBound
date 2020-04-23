import { format } from 'date-fns';

import { toDate } from 'util/time';
import { UserContact } from 'modules/contacts';
import { GroupedContacts } from 'views';

export const getGroupedContacts = (userContacts: UserContact[]) => {
  const groupedContacts: GroupedContacts = {};

  userContacts.map((contact) => {
    const newDate = format(toDate(contact.date), '-YMMdd');

    if (!groupedContacts[newDate]) {
      groupedContacts[newDate] = {
        date: toDate(contact.date),
        contacts: [contact],
      };
    } else {
      groupedContacts[newDate].contacts = [
        contact,
        ...groupedContacts[newDate].contacts,
      ];
    }
  });

  return groupedContacts;
};
