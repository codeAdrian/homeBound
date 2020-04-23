import React from 'react';
import { format } from 'date-fns';

import { Button, BUTTON } from 'components';
import { ReactComponent as TextBubble } from 'assets/icons/text_bubble.svg';
import { ReactComponent as CircleIcon } from 'assets/icons/circle_ring.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import { UserContact } from 'modules/contacts';

interface Props {
  date: Date;
  contacts: UserContact[];
  removeContact: (id: string) => void;
  setCurrentContact: (contact: UserContact) => void;
}

export const ContactCard: React.FC<Props> = ({
  date,
  contacts,
  removeContact,
  setCurrentContact,
}) => {
  const getContactCard = (contact: UserContact) => (
    <li className="contactCard" key={contact.id}>
      <div>
        <Button
          className={BUTTON.ROUNDED.CTA.SMALL}
          icon={<TrashIcon />}
          onClick={() => removeContact(contact.id)}
        />{' '}
        <span className="u-t-truncate">{contact.name}</span>
      </div>
      <Button
        className={BUTTON.ROUNDED.CTA.SMALL}
        icon={<TextBubble />}
        onClick={() => setCurrentContact(contact)}
      />
    </li>
  );
  return (
    <div className="contactGroup">
      <CircleIcon className="contactGroup__deco" />
      <span className="u-t__fontFamily--secondary u-t__fontSize--large u-t__fontWeihgt--bold">
        {format(date, 'dd')}
      </span>{' '}
      <span className="u-t__fontSize--xsmall u-o-6">{format(date, 'MMM')}</span>
      <ul className="contactGroup__list">{contacts.map(getContactCard)}</ul>
    </div>
  );
};
