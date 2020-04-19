import * as React from 'react';

import { useContactsServices } from 'modules/contacts';

const AddContact = () => {
  const [
    { userContacts },
    { addContact, removeContact },
  ] = useContactsServices();

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * 999999 + 10000);
    addContact({
      date: new Date(),
      name: `Contact - ${randomNum}`,
      phoneNumber: `+385${randomNum}`,
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Add contact</button>
      {userContacts?.map(({ name, phoneNumber, id }) => (
        <div>
          {name} - {phoneNumber} |
          <button onClick={() => removeContact(id)}>Remove</button> |
        </div>
      ))}
    </div>
  );
};

export { AddContact };
