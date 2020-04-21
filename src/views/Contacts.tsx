import React from 'react';
import { format } from 'date-fns';

import { useContactsServices, UserContact } from 'modules/contacts';
import { toDate } from 'util/time';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as TextBubble } from 'assets/icons/text_bubble.svg';
import { Button, BUTTON } from 'components';

export const Contacts = () => {
  const [recentContacts, setRecentContacts] = React.useState<UserContact[]>([]);
  const [, { getLastUserContacts }] = useContactsServices();
  const groupedContacts: {
    [k: string]: { date: Date; contacts: UserContact[] };
  } = {};

  const handleRecentContacts = (data: UserContact[]) => {
    setRecentContacts(data);
  };

  React.useEffect(() => {
    getLastUserContacts(100, handleRecentContacts);
  }, [getLastUserContacts]);

  const groupContacts = () => {
    console.log('recentContacts', recentContacts);
    if (!recentContacts) return null;
    recentContacts.map((contact) => {
      const newDate = format(toDate(contact.date), 'dMY');

      if (!groupedContacts[newDate]) {
        groupedContacts[newDate] = {
          date: toDate(contact.date),
          contacts: [contact],
        };
      } else {
        groupedContacts[newDate].contacts = [
          ...groupedContacts[newDate].contacts,
          contact,
        ];
      }

      console.log(groupedContacts);
    });
  };

  groupContacts();

  const test = Object.keys(groupedContacts).map(function (key) {
    const { date, contacts } = groupedContacts[key];
    return (
      <div key={key}>
        {format(date, 'd MMM')}
        {contacts.map(({ name, id }) => (
          <div className="contactCard" key={id}>
            {name}
            <Button
              className={BUTTON.ROUNDED.CTA.SMALL}
              icon={<TextBubble />}
              onClick={() => {}}
            ></Button>
          </div>
        ))}
      </div>
    );
  });

  return (
    <div>
      <Button
        icon={<PlusIcon />}
        className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
        onClick={() => {}}
      ></Button>
      {test}
    </div>
  );
};
