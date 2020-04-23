import React from 'react';
import isEmpty from 'lodash/isEmpty';

import {
  useContactsServices,
  UserContact,
  AddContactModal,
  ContactModal,
  ContactGroup,
} from 'modules/contacts';
import { Button, BUTTON, Heading, HEADING } from 'components';
import { useModalControls } from 'modules/modal';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as PlusLargeIcon } from 'assets/icons/plus_large.svg';
import { getGroupedContacts } from 'util/mapping';
import { useAppState } from 'modules/app';

export type GroupedContacts = {
  [k: string]: { date: Date; contacts: UserContact[] };
};

export const Contacts = () => {
  const [isModalOpen, { toggleModalState }] = useModalControls();
  const [currentContact, setCurrentContact] = React.useState<UserContact>();
  const [
    { userContacts },
    { getLastUserContacts, removeContact },
  ] = useContactsServices();
  const [, { setAppTheme }] = useAppState();

  React.useEffect(() => {
    setAppTheme({
      color: '#F7CE53',
      shapeClass: 'app__deco--default',
      showNav: true,
    });
  }, [setAppTheme]);

  React.useEffect(() => {
    getLastUserContacts();
  }, [getLastUserContacts]);

  const groupedContacts = React.useMemo(
    () => userContacts && getGroupedContacts(userContacts),
    [userContacts],
  );

  if (!groupedContacts) return null;

  return (
    <section className="app__content">
      <aside className="u-f--spaceBetween u-sb-12">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Contacts
        </Heading>
        <Button
          icon={<PlusIcon />}
          className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
          onClick={toggleModalState}
        />
      </aside>
      <main>
        <div className="u-t__fontSize--small u-o-6 u-sr-32 u-sb-28">
          Keep track of people you see and don't forget to check up on them
        </div>
        {groupedContacts && isEmpty(groupedContacts) ? (
          <Button
            onClick={toggleModalState}
            icon={<PlusLargeIcon />}
            className={BUTTON.SQUARE.LARGE.CTA}
          >
            Add contacts
          </Button>
        ) : (
          <ContactGroup
            groupedContacts={groupedContacts}
            removeContact={removeContact}
            setCurrentContact={setCurrentContact}
          />
        )}
        <AddContactModal
          isModalOpen={isModalOpen}
          toggleModalState={toggleModalState}
        />
        <ContactModal
          currentContact={currentContact}
          setCurrentContact={setCurrentContact}
        />
      </main>
    </section>
  );
};
