import React from 'react';

import { Button, Letter, BUTTON } from 'components';

interface Props {
  answerFirst: string;
  answerSecond: string;
  onClick: (message: string) => void;
}

type AnswerState = 'Yes' | 'No' | 'Waiting For Answer';

export const ChatControls: React.FC<Props> = ({
  answerFirst,
  answerSecond,
  onClick,
}) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<AnswerState>(
    'Waiting For Answer',
  );

  const handleAnswer = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (selectedAnswer !== 'Waiting For Answer') return;
      const { value, dataset } = e.currentTarget;
      const { message } = dataset;
      setSelectedAnswer(value as AnswerState);
      onClick(message || '');
    },
    [onClick, selectedAnswer],
  );

  return (
    <div className="chat__controls chat__message--animated chat__message--user">
      <div className="u-sb-16">
        <Button
          data-message={answerFirst}
          value="Yes"
          onClick={
            selectedAnswer === 'Waiting For Answer' ? handleAnswer : () => null
          }
          icon={<Letter>A</Letter>}
          className={
            selectedAnswer === 'Yes'
              ? BUTTON.PILL.SECONDARY.ACTIVE
              : BUTTON.PILL.SECONDARY.DEFAULT
          }
        >
          {answerFirst}
        </Button>
      </div>

      <div className="u-sb-16">
        <Button
          data-message={answerSecond}
          value="No"
          onClick={
            selectedAnswer === 'Waiting For Answer' ? handleAnswer : () => null
          }
          icon={<Letter>B</Letter>}
          className={
            selectedAnswer === 'No'
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
