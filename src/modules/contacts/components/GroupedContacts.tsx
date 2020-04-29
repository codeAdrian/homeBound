import React from 'react';
import { differenceInCalendarDays } from 'date-fns';

import { useContactsServices } from 'modules/contacts';
import { toDate } from 'util/time';

export const GroupedContacts = () => {
  const [{ userContacts }] = useContactsServices();
  if (!userContacts || userContacts.length === 0) return null;

  return (
    <>
      {userContacts.map(({ name, date, id }) => {
        const distance = differenceInCalendarDays(new Date(), toDate(date));

        const distanceValue = (
          <div className="contactCard__distance">
            <span className="contactCard__value u-t__fontFamily--secondary">
              {distance}
            </span>

            <span className="contactCard__text u-t__fontFamily--primary u-t__fontSize--xxsmall u-o-1">
              {distance === 1 ? 'day ago' : 'days ago'}
            </span>
          </div>
        );

        return (
          <article className="contactCard" key={id}>
            <div className="contactCard__name u-t-truncate">{name}</div>
            {distanceValue}
          </article>
        );
      })}
    </>
  );
};
