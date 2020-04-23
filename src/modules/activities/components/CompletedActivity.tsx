import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { useScoreServices } from 'modules/score';
import { Card } from 'components';

export const CompletedActivity = () => {
  const [{ userScore, isLoading }, { getScoreHistory }] = useScoreServices();

  React.useEffect(() => {
    getScoreHistory();
  }, [getScoreHistory]);

  if (isLoading && isEmpty(userScore?.history)) return null;

  if (!userScore || isEmpty(userScore?.history))
    return <>"You'll see all your completed tasks here."</>;

  return (
    <section>
      {userScore.history.map((activity) => (
        <Card key={activity.id} mode="list" activity={activity} />
      ))}
    </section>
  );
};
