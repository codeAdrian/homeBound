import * as React from 'react';
import { isEmpty } from 'lodash';

import { updateUserSettings } from 'modules/settings';
import { UserAuthData, UserState } from 'modules/user';

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

const SplashSettings = ({ user: { userData } }: { user: UserState }) => {
  const [questionNum, setQuestionNum] = React.useState(0);

  if (questionNum >= QUESTIONS.length || !userData) return null;

  if (userData.settings) return null;

  const { question, answerPositive, answerNegative, label } = QUESTIONS[
    questionNum
  ];

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    const newValue = value === 'true';
    const newIndex = questionNum + 1;
    if (!isEmpty(userData))
      updateUserSettings(userData as firebase.UserInfo, {
        [label]: newValue,
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
