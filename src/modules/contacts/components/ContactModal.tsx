import React from 'react';

import { Button, BUTTON, Heading, HEADING } from 'components';
import { Modal } from 'modules/modal';
import { MessageForm, UserContact } from 'modules/contacts';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

interface Props {
  currentContact?: UserContact;
  setCurrentContact: (value?: UserContact) => void;
}

export const ContactModal: React.FC<Props> = ({
  currentContact,
  setCurrentContact,
}) => {
  return (
    <Modal isModalOpen={!!currentContact}>
      <div className="contactModal l-page">
        <aside className="u-f--spaceBetween u-sb-12">
          <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
            Message Contact
          </Heading>
          <Button
            icon={<CloseIcon />}
            className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
            onClick={() => setCurrentContact(undefined)}
          />
        </aside>
        <div className="u-t__fontSize--small u-o-6 u-sr-32 u-sb-28">
          Keep track of people you see and don't forget to check up on them.
        </div>
        <main className="l-vertical u-f--grow1">
          {currentContact && <MessageForm currentContact={currentContact} />}
        </main>
      </div>
    </Modal>
  );
};
