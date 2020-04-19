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
import { MessageForm, AddContact } from 'modules/contacts';
import { Button, BUTTON } from 'components';
import { ReactComponent as GoogleIcon } from 'assets/icons/google.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as PersonIcon } from 'assets/icons/person.svg';
import { useAppState } from 'modules/app';

const Dashboard: React.FC = () => {
  const [{ userData }] = useUserServices();
  const [{ userSettings }] = useSettingsServices();
  const [{ userScore }, { getScoreHistory }] = useScoreServices();

  useScoreListener(userData);

  const [, { setAppThemeColor }] = useAppState();

  React.useEffect(() => {
    if (userData) {
      setAppThemeColor('#6A62FF');
    }
  }, [setAppThemeColor, userData]);

  if (!userData) return <Redirect to="/login" />;

  return (
    <section className="app__content">
      <Button
        icon={<GoogleIcon />}
        className={BUTTON.PILL.PRIMARY.BASE}
        onClick={() => {}}
      >
        Sign up
      </Button>
      <br />
      <Button className={BUTTON.PILL.CTA.BASE.GLOW} onClick={() => {}}>
        Change password
      </Button>
      <br />
      <Button
        icon={<PlusIcon />}
        className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
        onClick={() => {}}
      />

      <Button
        icon={<PlusIcon className="icon--small" />}
        className={BUTTON.ROUNDED.CTA.SMALL}
        onClick={() => {}}
      />
      <Button
        icon={<PersonIcon className="icon--lightest" />}
        className={BUTTON.SQUARE.CTA.MIXED.GLOW}
        onClick={() => {}}
      />
      <Button
        icon={<PersonIcon className="icon--darker" />}
        className={BUTTON.SQUARE.GHOST.MIXED}
        onClick={() => {}}
      />
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
      <AddContact />
      <LogOut />
    </section>
  );
};

export { Dashboard };
