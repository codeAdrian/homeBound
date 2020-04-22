import React from 'react';
import { differenceInCalendarDays } from 'date-fns';

import { useContactsServices, AddContactModal } from 'modules/contacts';
import { toDate } from 'util/time';
import { Button, BUTTON } from 'components';
import { ReactComponent as PlusIcon } from 'assets/icons/plus_large.svg';
import { useModalControls } from 'modules/modal';

export const ContactSummary = () => {
  const [isModalOpen, { toggleModalState }] = useModalControls();
  const [{ userContacts }, { getLastUserContacts }] = useContactsServices();

  React.useEffect(() => {
    getLastUserContacts();
  }, [getLastUserContacts]);

  console.log({ userContacts });

  if (!userContacts || userContacts.length === 0)
    return (
      <>
        <label className="u-d-block u-sb-12 u-t__fontSize--small u-t__fontWeight--medium">
          Your close contacts
        </label>
        <Button
          onClick={toggleModalState}
          icon={<PlusIcon />}
          className={BUTTON.SQUARE.LARGE.CTA}
        >
          Add contacts
        </Button>
        <AddContactModal
          isModalOpen={isModalOpen}
          toggleModalState={toggleModalState}
        />
      </>
    );

  if (userContacts.length > 2) userContacts.length = 2;

  return (
    <>
      <label className="u-d-block u-sb-12 u-t__fontSize--small u-t__fontWeight--medium">
        Your recent close contacts
      </label>
      {userContacts.map(({ name, date, id }) => {
        const distance = differenceInCalendarDays(new Date(), toDate(date));

        const distanceValue = (
          <div className="contactCard__distance">
            <span className="contactCard__value u-t__fontFamily--secondary">
              {distance}
            </span>

            <span className="contactCard__text u-t__fontFamily--primary u-t__fontSize--xxsmall u-o-5">
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
