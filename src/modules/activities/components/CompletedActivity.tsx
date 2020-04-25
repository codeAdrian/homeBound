import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { useScoreServices } from 'modules/score';
import { Card, Button, BUTTON } from 'components';

export const CompletedActivity = () => {
  const [{ userScore, isLoading }, { getScoreHistory }] = useScoreServices();

  React.useEffect(() => {
    getScoreHistory();
  }, [getScoreHistory]);

  if (isLoading && isEmpty(userScore?.history)) return null;

  if (!userScore || isEmpty(userScore?.history))
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
    <section>
      {userScore.history.map((activity) => (
        <Card key={activity.id} mode="list" activity={activity} />
      ))}
    </section>
  );
};
