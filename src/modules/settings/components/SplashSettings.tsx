import * as React from 'react';
import { Redirect } from 'react-router-dom';

import {
  SplashQuestion,
  QUESTIONS,
  useSettingsServices,
} from 'modules/settings';
import { useUserServices } from 'modules/user';
import { useAppState } from 'modules/app';
import { SplashScreen } from 'components';

const SplashSettings: React.FC = () => {
  const COLORS = React.useMemo(() => ['#6A62FF', '#F85E5E', '#FAC936'], []);
  const [{ userSettings }, { updateSettings }] = useSettingsServices();
  const [{ userData }] = useUserServices();
  const [, { setAppTheme }] = useAppState();
  const [questionNum, setQuestionNum] = React.useState(0);

  React.useEffect(() => {
    setAppTheme({
      color: COLORS[questionNum],
      shapeClass: 'app__deco--default',
      showNav: false,
    });
  }, [COLORS, questionNum, setAppTheme]);

  if (userSettings && userSettings.surveyCompleted) return <Redirect to="/" />;

  if (questionNum >= QUESTIONS.length) return <SplashScreen />;

  const { label } = QUESTIONS[questionNum];

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userData) return;
    const { value } = e.currentTarget;
    const newIndex = questionNum + 1;
    const isLastQuestion = newIndex >= QUESTIONS.length;

    const updatedValue = {
      [label]: value === 'true',
      surveyCompleted: isLastQuestion,
    };

    updateSettings(userData, updatedValue);

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
