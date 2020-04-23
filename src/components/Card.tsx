import React from 'react';

import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { ReactComponent as MascotIcon } from 'assets/icons/mascot.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import { Button, BUTTON } from 'components';

interface Props {
  mode: 'list' | 'grid';
}

export const Card: React.FC<Props> = ({ mode }) => {
  const isList = mode === 'list';
  const cardClassName = isList ? 'card--list' : 'cardGrid';
  const cardContentClassName = isList
    ? 'card__content--list'
    : 'card__content--grid';
  const cardTextClassName = isList ? 'card__text--list' : 'card__text--grid';
  const cardScoreClassName = isList ? 'card__score--list' : 'card__score--grid';
  const cardFooterClassName = isList
    ? 'card__footer--list'
    : 'card__footer--grid';
  const cardRemoveClassName = isList
    ? 'card__remove--list'
    : 'card__remove--grid';

  return (
    <article className={`card ${cardClassName}`}>
      <CheckIcon className="card__complete" />
      <div className="card__deco card__deco--list">
        <MascotIcon className="card__image" />
      </div>
      <div className={cardContentClassName}>
        <div className={`${cardTextClassName} u-t__fontSize--xsmall`}>
          Did a round of excercise
        </div>
        <div className={cardFooterClassName}>
          <span
            className={`${cardScoreClassName} u-t__fontFamily--secondary u-t__fontSize--base u-t__fontWeight--bold`}
          >
            +2
          </span>
          <div className={cardRemoveClassName}>
            <Button className={BUTTON.ROUNDED.CTA.SMALL} icon={<TrashIcon />} />
          </div>
        </div>
      </div>
    </article>
  );
};
