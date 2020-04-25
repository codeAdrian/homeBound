import React from 'react';

import { Modal } from 'modules/modal';
import { Button, BUTTON, Heading, HEADING, Tabs } from 'components';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { AddActivity, ActivitySuggestion } from 'modules/activities';

interface Props {
  isModalOpen: boolean;
  toggleModalState: VoidFunction;
  isLight?: boolean;
}

export const ActivityModal: React.FC<Props> = ({
  isModalOpen,
  toggleModalState,
  isLight,
}) => {
  return (
    <Modal isModalOpen={isModalOpen}>
      <div className={`contactModal l-page ${isLight ? 'app--light' : ''}`}>
        <section className="contactModal l-page">
          <aside className="u-f--spaceBetween u-sb-40">
            <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
              Add Activity
            </Heading>
            <Button
              icon={<CloseIcon />}
              className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
              onClick={() => toggleModalState()}
            />
          </aside>
          <main className="l-page">
            <Tabs
              titleMain="Suggested activities"
              titleSecondary="Add activity"
              contentMain={
                <ActivitySuggestion
                  callback={toggleModalState}
                  isLight={isLight}
                />
              }
              contentSecondary={<AddActivity callback={toggleModalState} />}
            />
          </main>
        </section>
      </div>
    </Modal>
  );
};
