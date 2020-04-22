import React from 'react';

import { Button, BUTTON } from 'components';
import { Modal } from 'modules/modal';
import { MessageForm, UserContact } from 'modules/contacts';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';

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
          icon={<PlusIcon />}
          className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
          onClick={() => setCurrentContact(undefined)}
        />
        {currentContact && <MessageForm currentContact={currentContact} />}
      </div>
    </Modal>
  );
};
