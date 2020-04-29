import React from 'react';

import { Button, Letter, BUTTON } from 'components';

interface Props {
  answerFirst: string;
  answerSecond: string;
  onClickFirst: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickSecond: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ChatControls: React.FC<Props> = ({
  answerFirst,
  answerSecond,
  onClickFirst,
  onClickSecond,
}) => {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState(-1);

  const handleAnswer = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { value } = e.currentTarget;
      setIsCompleted(true);
      setSelectedAnswer(value === 'Yes' ? 1 : 0);
    },
    [],
  );

  const handleFirstAnswer = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isCompleted) return;
      handleAnswer(e);
      onClickFirst(e);
    },
    [handleAnswer, isCompleted, onClickFirst],
  );

  const handleSecondAnswer = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isCompleted) return;
      handleAnswer(e);
      onClickSecond(e);
    },
    [handleAnswer, isCompleted, onClickSecond],
  );

  return (
    <div className="chat__controls chat__message--animated chat__message--user">
      <div className="u-sb-16">
        <Button
          value="Yes"
          onClick={handleFirstAnswer}
          icon={<Letter>A</Letter>}
          className={
            selectedAnswer === 1
              ? BUTTON.PILL.SECONDARY.ACTIVE
              : BUTTON.PILL.SECONDARY.DEFAULT
          }
        >
          {answerFirst}
        </Button>
      </div>

      <div className="u-sb-16">
        <Button
          value="No"
          onClick={handleSecondAnswer}
          icon={<Letter>B</Letter>}
          className={
            selectedAnswer === 0
              ? BUTTON.PILL.SECONDARY.ACTIVE
              : BUTTON.PILL.SECONDARY.DEFAULT
          }
        >
          {answerSecond}
        </Button>
      </div>
    </div>
  );
};
