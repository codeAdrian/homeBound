import * as React from 'react';
import { useDispatch } from 'react-redux';
import has from 'lodash/has';

import {
  updateUserSettings,
  SettingsActionTypes,
  SettingsState,
} from 'modules/settings';
import { UserState } from 'modules/user';

const QUESTIONS = [
  {
    question: 'Question 1 text',
    answerPositive: 'Positive answer 1',
    answerNegative: 'Negative answer 1',
    label: 'test1',
  },
  {
    question: 'Question 2 text',
    answerPositive: 'Positive answer 2',
    answerNegative: 'Negative answer 2',
    label: 'test2',
  },
];

interface Props {
  userData: UserState['userData'];
  userSettings: SettingsState['userSettings'];
}

const SplashSettings = ({ userSettings, userData }: Props) => {
  const dispatch = useDispatch();
  const [questionNum, setQuestionNum] = React.useState(0);

  if (has(userSettings, 'test1') && has(userSettings, 'test2')) return null;

  if (questionNum >= QUESTIONS.length) return null;

  const { question, answerPositive, answerNegative, label } = QUESTIONS[
    questionNum
  ];

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    const newValue = value === 'true';
    const newIndex = questionNum + 1;

    const updatedSettings = await updateUserSettings(
      userData as firebase.UserInfo,
      {
        [label]: newValue,
      },
    );

    dispatch({
      type: SettingsActionTypes.Success,
      payload: updatedSettings,
    });

    setQuestionNum(newIndex);
  };

  return (
    <div>
      {question}
      <button value="true" onClick={handleOnClick}>
        {answerPositive}
      </button>
      <button value="false" onClick={handleOnClick}>
        {answerNegative}
      </button>
    </div>
  );
};

export { SplashSettings };
