import React from 'react';
import { toast, ToastPosition, ToastType } from 'react-toastify';

import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';
import { ReactComponent as MascotIcon } from 'assets/icons/mascot.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';
import { Button, BUTTON } from 'components';
import { UserActivity } from 'modules/activities';

interface Props {
  mode: 'list' | 'grid';
  activity: UserActivity;
  onRemove?: (id: string) => void;
  onComplete?: (id: string) => void;
}

const CARD_STYLE = [
  'card__deco--secondary',
  'card__deco--tertiary',
  'card__deco--quaternary',
];

export const Card: React.FC<Props> = ({
  mode,
  activity,
  onRemove,
  onComplete,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { title, score, style, id } = activity;
  const isList = mode === 'list';
  const cardClassName = isList ? 'card--list' : 'cardGrid';
  const cardContentClassName = isList
    ? 'card__content--list'
    : 'card__content--grid';
  const cardTextClassName = isList ? 'card__text--list' : 'card__text--grid';
  const cardDecoClassName = isList ? 'card__deco--list' : 'card__deco--grid';
  const cardScoreClassName = isList ? 'card__score--list' : 'card__score--grid';
  const cardFooterClassName = isList
    ? 'card__footer--list'
    : 'card__footer--grid';
  const cardRemoveClassName = isList
    ? 'card__remove--list'
    : 'card__remove--grid';

  const handleRemove = React.useCallback(async () => {
    setIsLoading(true);
    if (!onRemove) return;
    try {
      await onRemove(id);
    } catch (error) {
      setIsLoading(false);
      toast(error.message, {
        closeButton: false,
        position: ToastPosition.TOP_CENTER,
        type: ToastType.ERROR,
      });
    }
  }, [id, onRemove]);

  const handleComplete = React.useCallback(async () => {
    setIsLoading(true);
    if (!onComplete) return;
    try {
      await onComplete(id);
    } catch (error) {
      setIsLoading(false);
      toast(error.message, {
        closeButton: false,
        position: ToastPosition.TOP_CENTER,
        type: ToastType.ERROR,
      });
    }
  }, [id, onComplete]);

  return (
    <article
      className={`card ${cardClassName} ${isLoading ? 'card--loading' : ''}`}
    >
      {onComplete && (
        <CheckIcon onClick={handleComplete} className="card__complete" />
      )}
      <div className={`card__deco ${cardDecoClassName} ${CARD_STYLE[style]}`}>
        <MascotIcon className="card__image" />
      </div>
      <div className={cardContentClassName}>
        <div className={`${cardTextClassName} u-t__fontSize--xsmall`}>
          {title}
        </div>
        <div className={cardFooterClassName}>
          <span
            className={`${cardScoreClassName} u-t__fontFamily--secondary u-t__fontSize--base u-t__fontWeight--bold`}
          >
            +{score}
          </span>
          {onRemove && (
            <div className={cardRemoveClassName}>
              <Button
                onClick={handleRemove}
                className={BUTTON.ROUNDED.CTA.SMALL}
                icon={<TrashIcon />}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
