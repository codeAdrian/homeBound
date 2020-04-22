import React from 'react';

import { Modal } from 'modules/modal';
import { Button, BUTTON } from 'components';
import { AddContact } from 'modules/contacts';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';

interface Props {
  isModalOpen: boolean;
  toggleModalState: VoidFunction;
}

export const AddContactModal: React.FC<Props> = ({
  isModalOpen,
  toggleModalState,
}) => {
  return (
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
  );
};
