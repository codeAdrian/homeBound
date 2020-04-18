import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { SplashSettings, useSettingsServices } from 'modules/settings';
import { LogOut, useUserServices } from 'modules/user';
import { AddActivity } from 'modules/activities';
import {
  IncrementScore,
  useScoreListener,
  useScoreServices,
} from 'modules/score';
import { MessageForm } from 'modules/contacts';

const Dashboard: React.FC = () => {
  const [{ userData }] = useUserServices();
  const [{ userSettings }] = useSettingsServices();
  const [{ userScore }, { getScoreHistory }] = useScoreServices();

  useScoreListener(userData);

  if (!userData) return <Redirect to="/login" />;

  return (
    <>
      <MessageForm />
      <AddActivity />
      <strong>Update score realtime: </strong>
      {userScore && userScore.score}
      <IncrementScore user={userData} />
      <SplashSettings userSettings={userSettings} userData={userData} />
      <strong>Update user history on demand:</strong>
      <button onClick={getScoreHistory}>Update</button>
      {userScore?.history &&
        userScore?.history.length > 0 &&
        userScore?.history.map(({ score, title }) => (
          <div>
            {title}: {score} points
          </div>
        ))}
      <LogOut />
    </>
  );
};

export { Dashboard };
