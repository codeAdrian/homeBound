import React from 'react';

import { ReactComponent as Mascot } from 'assets/icons/mascot.svg';
import { ReactComponent as Mascots } from 'assets/icons/mascot_x3.svg';
import { Button, BUTTON, HEADING, Heading } from 'components';

interface Props {
  question: string;
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  answerNegative: string;
  answerPositive: string;
  questionNum: number;
  questionMax: number;
}

const SplashQuestion: React.FC<Props> = ({
  question,
  handleOnClick,
  answerNegative,
  answerPositive,
  questionNum,
  questionMax,
}) => {
  return (
    <>
      <div>
        <div className="headingBanner u-sb-12">
          <Heading tag="h2" className={HEADING.SECONDARY.SMALL.BOLD}>
            Question {questionNum}{' '}
            <span className="u-o-4">of {questionMax}</span>
          </Heading>
        </div>
        <div className="u-sb-40">
          <Heading tag="h2" className={HEADING.SECONDARY.XLARGE.BOLD}>
            {question}
          </Heading>
        </div>
        {questionNum === questionMax ? (
          <Mascots className="u-ab-center u-d-block" />
        ) : (
          <Mascot className="u-ab-center u-d-block" />
        )}
      </div>
      <div>
        <Button
          className={BUTTON.COMBINED.PRIMARY.BASE.TOP}
          value="true"
          onClick={handleOnClick}
        >
          {answerPositive}
        </Button>
        <Button
          className={BUTTON.COMBINED.PRIMARY.BASE.BOTTOM}
          value="false"
          onClick={handleOnClick}
        >
          {answerNegative}
        </Button>
      </div>
    </>
  );
};

export { SplashQuestion };
