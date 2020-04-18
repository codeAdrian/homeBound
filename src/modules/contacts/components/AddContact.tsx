import * as React from 'react';

import { useContactsServices } from 'modules/contacts';

const AddContact = () => {
  const [
    { userContacts },
    { addContact, removeContact },
  ] = useContactsServices();

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * 10 + 1);
    addContact({
      date: new Date(),
      title: `Contact - ${randomNum}`,
      score: randomNum,
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Add contact</button>
      {userContacts?.map(({ title, id }) => (
        <div>
          {title} <button onClick={() => removeContact(id)}>Remove</button> |
        </div>
      ))}
    </div>
  );
};

export { AddContact };
