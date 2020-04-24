import React from 'react';
import { isEmpty } from 'lodash';

import { Card, Button, BUTTON } from 'components';
import { ActivityModal, useActivitiesServices } from 'modules/activities';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';

interface Props {
  isModalOpen: boolean;
  toggleModalState: VoidFunction;
}

export const ActivityList: React.FC<Props> = ({
  isModalOpen,
  toggleModalState,
}) => {
  const [
    { userActivities, isLoading },
    { removeActivity, completeActivity },
  ] = useActivitiesServices();

  if (isLoading && isEmpty(userActivities))
    return (
      <>
        <Button className={BUTTON.SQUARE.LARGE.PRIMARY}>&nbsp;</Button>
        <br />
        <Button className={BUTTON.SQUARE.LARGE.PRIMARY}>&nbsp;</Button>
        <br />
        <Button className={BUTTON.SQUARE.LARGE.PRIMARY}>&nbsp;</Button>
      </>
    );

  return (
    <>
      {userActivities?.map((activity) => (
        <Card
          key={activity.id}
          onComplete={completeActivity}
          onRemove={removeActivity}
          activity={activity}
          mode="list"
        />
      ))}
      <Button
        icon={<PlusIcon />}
        onClick={toggleModalState}
        className={BUTTON.SQUARE.LARGE.PRIMARY}
      >
        {userActivities && isEmpty(userActivities)
          ? 'Add tasks'
          : 'Add more tasks'}
      </Button>
      <ActivityModal
        isModalOpen={isModalOpen}
        toggleModalState={toggleModalState}
        isLight
      />
    </>
  );
};
