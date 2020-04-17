import * as React from 'react';
import { useDispatch } from 'react-redux';

import {
  SplashQuestion,
  updateUserSettings,
  SettingsActionTypes,
  SettingsState,
  QUESTIONS,
} from 'modules/settings';
import { UserState } from 'modules/user';

interface Props {
  userData: UserState['userData'];
  userSettings: SettingsState['userSettings'];
}

const SplashSettings: React.FC<Props> = ({ userSettings, userData }) => {
  const dispatch = useDispatch();
  const [questionNum, setQuestionNum] = React.useState(0);

  if ((userSettings && userSettings.surveyCompleted) || !userData) return null;

  const { label } = QUESTIONS[questionNum];

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    const newIndex = questionNum + 1;
    const isLastQuestion = newIndex >= QUESTIONS.length;

    const updatedValue = {
      [label]: value === 'true',
      surveyCompleted: isLastQuestion,
    };

    const updatedSettings = await updateUserSettings(userData, updatedValue);

    dispatch({
      type: SettingsActionTypes.Success,
      payload: updatedSettings,
    });

    setQuestionNum(newIndex);
  };

  return (
    <SplashQuestion handleOnClick={handleOnClick} {...QUESTIONS[questionNum]} />
  );
};

export { SplashSettings };
