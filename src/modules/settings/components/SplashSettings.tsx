import * as React from 'react';

import {
  SplashQuestion,
  SettingsState,
  QUESTIONS,
  useSettingsServices,
} from 'modules/settings';
import { UserState, useUserServices } from 'modules/user';

interface Props {
  userData: UserState['userData'];
  userSettings: SettingsState['userSettings'];
}

const SplashSettings: React.FC<Props> = ({ userSettings, userData }) => {
  const [, { updateSettings }] = useSettingsServices();
  const [user] = useUserServices();
  const [questionNum, setQuestionNum] = React.useState(0);

  if ((userSettings && userSettings.surveyCompleted) || !userData) return null;
  if (questionNum >= QUESTIONS.length) return null;

  const { label } = QUESTIONS[questionNum];

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user.userData) return;
    const { value } = e.currentTarget;
    const newIndex = questionNum + 1;
    const isLastQuestion = newIndex >= QUESTIONS.length;

    const updatedValue = {
      [label]: value === 'true',
      surveyCompleted: isLastQuestion,
    };

    updateSettings(user.userData, updatedValue);

    setQuestionNum(newIndex);
  };

  return (
    <SplashQuestion handleOnClick={handleOnClick} {...QUESTIONS[questionNum]} />
  );
};

export { SplashSettings };
