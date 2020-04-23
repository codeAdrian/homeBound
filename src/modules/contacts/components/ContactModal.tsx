import React from 'react';

import { Button, BUTTON } from 'components';
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
      <div className="contactModal">
        <Button
          icon={<CloseIcon />}
          className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
          onClick={() => setCurrentContact(undefined)}
        />
        {currentContact && <MessageForm currentContact={currentContact} />}
      </div>
    </Modal>
  );
};
