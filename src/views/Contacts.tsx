import React from 'react';
import { format } from 'date-fns';

import { useContactsServices, UserContact, AddContact } from 'modules/contacts';
import { toDate } from 'util/time';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as TextBubble } from 'assets/icons/text_bubble.svg';
import { ReactComponent as CircleIcon } from 'assets/icons/circle_ring.svg';
import { Button, BUTTON } from 'components';
import { Modal, useModalControls } from 'modules/modal';

export const Contacts = () => {
  const [isModalOpen, { toggleModalState }] = useModalControls();
  const [{ userContacts }, { getLastUserContacts }] = useContactsServices();
  const groupedContacts: {
    [k: string]: { date: Date; contacts: UserContact[] };
  } = {};

  React.useEffect(() => {
    getLastUserContacts();
  }, [getLastUserContacts]);

  userContacts &&
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

  const sortedContactCards = React.useMemo(
    () =>
      Object.keys(groupedContacts).map(function (key) {
        const { date, contacts } = groupedContacts[key];
        return (
          <div key={key} className="contactGroup">
            <CircleIcon className="contactGroup__deco" />
            <span className="u-t__fontFamily--secondary u-t__fontSize--large u-t__fontWeihgt--bold">
              {format(date, 'dd')}
            </span>{' '}
            <span className="u-t__fontSize--xsmall u-o-6">
              {format(date, 'MMM')}
            </span>
            <ul className="contactGroup__list">
              {contacts.map(({ name, id }) => (
                <li className="contactCard" key={id}>
                  {name}
                  <Button
                    className={BUTTON.ROUNDED.CTA.SMALL}
                    icon={<TextBubble />}
                    onClick={() => {}}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      }),
    [groupedContacts],
  );

  console.log({ groupedContacts, userContacts });

  if (!userContacts) return null;

  return (
    <section className="app__content">
      <Modal isModalOpen={isModalOpen}>
        <div className="contactModal">
          <Button
            icon={<PlusIcon />}
            className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
            onClick={toggleModalState}
          />
          <AddContact callback={toggleModalState} />
        </div>
      </Modal>
      <Button
        icon={<PlusIcon />}
        className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
        onClick={toggleModalState}
      />
      {sortedContactCards}
    </section>
  );
};
