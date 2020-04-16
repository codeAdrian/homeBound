import React from 'react';

interface Props {
  question: string;
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  answerNegative: string;
  answerPositive: string;
}

const SplashQuestion = ({
  question,
  handleOnClick,
  answerNegative,
  answerPositive,
}: Props) => {
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

export { SplashQuestion };
