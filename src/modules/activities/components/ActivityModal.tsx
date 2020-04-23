import React from 'react';

import { Modal } from 'modules/modal';
import { Button, BUTTON } from 'components';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { AddActivity } from 'modules/activities';

interface Props {
  isModalOpen: boolean;
  toggleModalState: VoidFunction;
}

export const ActivityModal: React.FC<Props> = ({
  isModalOpen,
  toggleModalState,
}) => {
  return (
    <Modal isModalOpen={isModalOpen}>
      <div className="contactModal">
        <Button
          icon={<CloseIcon />}
          className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
          onClick={() => toggleModalState()}
        />
        <AddActivity callback={toggleModalState} />
      </div>
    </Modal>
  );
};
