import React from 'react';

import { UserContact, ContactCard } from 'modules/contacts';
import { GroupedContacts } from 'views';

interface Props {
  groupedContacts: GroupedContacts;
  removeContact: (id: string) => void;
  setCurrentContact: (contact: UserContact) => void;
}

export const ContactGroup: React.FC<Props> = ({
  groupedContacts,
  removeContact,
  setCurrentContact,
}) => {
  const getContactCard = React.useCallback(
    (key: string) => (
      <ContactCard
        {...groupedContacts[key]}
        removeContact={removeContact}
        setCurrentContact={setCurrentContact}
        key={key}
      />
    ),
    [groupedContacts, removeContact, setCurrentContact],
  );

  const sortedContactCards = React.useMemo(
    () => Object.keys(groupedContacts).map(getContactCard),
    [getContactCard, groupedContacts],
  );

  return <>{sortedContactCards}</>;
};
