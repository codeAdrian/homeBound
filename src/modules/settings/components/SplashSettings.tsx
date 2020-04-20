import * as React from 'react';
import { Redirect } from 'react-router-dom';

import {
  SplashQuestion,
  SettingsState,
  QUESTIONS,
  useSettingsServices,
} from 'modules/settings';
import { UserState, useUserServices } from 'modules/user';
import { useAppState } from 'modules/app';
import { SplashScreen } from 'components';

interface Props {
  userData: UserState['userData'];
  userSettings: SettingsState['userSettings'];
}

const SplashSettings: React.FC<Props> = ({ userSettings, userData }) => {
  const [, { updateSettings }] = useSettingsServices();
  const [user] = useUserServices();
  const [, { setAppTheme }] = useAppState();
  const [questionNum, setQuestionNum] = React.useState(0);

  React.useEffect(() => {
    if (userSettings && !userSettings.surveyCompleted) {
      const color = questionNum < 1 ? '#6A62FF' : '#F85E5E';
      setAppTheme({ color, shapeClass: 'app__deco--default' });
    }
  }, [questionNum, setAppTheme, userSettings]);

  if (questionNum >= QUESTIONS.length) return <SplashScreen />;
  if ((userSettings && userSettings.surveyCompleted) || !userData)
    return <Redirect to="/" />;

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
    <SplashQuestion
      questionNum={questionNum + 1}
      questionMax={QUESTIONS.length}
      handleOnClick={handleOnClick}
      {...QUESTIONS[questionNum]}
    />
  );
};

export { SplashSettings };
