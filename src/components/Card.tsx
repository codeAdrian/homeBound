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
  const isList = mode === 'list';
  const getClassName = (component: string) =>
    isList ? `card__${component}--list ` : `card__${component}--grid`;

  const [isLoading, setIsLoading] = React.useState(false);
  const { title, score, style, id } = activity;
  const cardClassName = isList ? 'card--list' : 'cardGrid';
  const cardContentClassName = getClassName('content');
  const cardTextClassName = getClassName('text');
  const cardDecoClassName = getClassName('deco');
  const cardScoreClassName = getClassName('score');
  const cardFooterClassName = getClassName('footer');
  const cardRemoveClassName = getClassName('remove');

  const handleClick = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const { currentTarget } = e;
      try {
        if ('value' in currentTarget && currentTarget.value === 'remove') {
          onRemove && (await onRemove(id));
        } else {
          onComplete && (await onComplete(id));
        }
      } catch (error) {
        setIsLoading(false);
        toast(error.message, {
          closeButton: false,
          position: ToastPosition.TOP_CENTER,
          type: ToastType.ERROR,
        });
      }
    },
    [id, onComplete, onRemove],
  );

  return (
    <article
      className={`card ${cardClassName} ${isLoading ? 'card--loading' : ''}`}
    >
      {onComplete && (
        <Button onClick={handleClick} className="button card__complete">
          <CheckIcon />
        </Button>
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
                value="remove"
                onClick={handleClick}
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
