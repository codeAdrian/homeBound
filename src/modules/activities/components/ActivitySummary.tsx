import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { ReactComponent as PlusIcon } from 'assets/icons/plus_large.svg';
import { Button, BUTTON, Card, CardSlider, CardSpace } from 'components';
import { useActivitiesServices } from 'modules/activities';

export const ActivitySummary = () => {
  const [{ userActivities }] = useActivitiesServices();

  if (!userActivities || isEmpty(userActivities))
    return (
      <section>
        <label className="u-d-block u-sb-12 u-t__fontSize--small u-t__fontWeight--medium">
          Your todo list
        </label>
        <Button icon={<PlusIcon />} className={BUTTON.SQUARE.LARGE.CTA}>
          Add tasks
        </Button>
      </section>
    );

  return (
    <section>
      <label className="u-d-block u-sb-12 u-t__fontSize--small u-t__fontWeight--medium">
        Your todo list
      </label>
      <CardSlider>
        {userActivities?.map((activity) => (
          <Card activity={activity} mode="grid" />
        ))}
        {userActivities?.length > 2 && <CardSpace />}
      </CardSlider>
    </section>
  );
};
