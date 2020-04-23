import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { ReactComponent as PlusIcon } from 'assets/icons/plus_large.svg';
import { Button, BUTTON, Card, CardSlider, CardSpace } from 'components';
import { useActivitiesServices, ActivityModal } from 'modules/activities';
import { useModalControls } from 'modules/modal';

export const ActivitySummary = () => {
  const [isModalOpen, { toggleModalState }] = useModalControls();
  const [
    { userActivities },
    { removeActivity, completeActivity },
  ] = useActivitiesServices();

  if (!userActivities || isEmpty(userActivities))
    return (
      <section className="u-sb-28">
        <ActivityModal
          isModalOpen={isModalOpen}
          toggleModalState={toggleModalState}
        />
        <label className="u-d-block u-sb-12 u-t__fontSize--small u-t__fontWeight--medium">
          Your todo list
        </label>
        <Button
          onClick={toggleModalState}
          icon={<PlusIcon />}
          className={BUTTON.SQUARE.LARGE.CTA}
        >
          Add tasks
        </Button>
      </section>
    );

  return (
    <section className="u-sb-36">
      <label className="u-d-block u-sb-12 u-t__fontSize--small u-t__fontWeight--medium">
        Your todo list
      </label>
      <CardSlider>
        {userActivities?.map((activity) => (
          <Card
            onComplete={completeActivity}
            onRemove={removeActivity}
            activity={activity}
            mode="grid"
          />
        ))}
        {userActivities?.length > 2 && <CardSpace />}
      </CardSlider>
    </section>
  );
};
