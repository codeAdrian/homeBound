import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { Button, BUTTON } from 'components';
import { ReactComponent as PlusIconLight } from 'assets/icons/plus.svg';
import { ReactComponent as PlusIconDark } from 'assets/icons/plus_large.svg';
import { useSettingsServices } from 'modules/settings';
import { useActivitiesServices, SUGGESTIONS } from 'modules/activities';

interface Props {
  isLight?: boolean;
  callback: VoidFunction;
}

export const ActivitySuggestion: React.FC<Props> = ({ isLight, callback }) => {
  const [, { addActivity }] = useActivitiesServices();
  const [{ userSettings }] = useSettingsServices();

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { value } = e.currentTarget;
      const dateValue = new Date();

      addActivity({
        date: dateValue,
        title: value,
        score: Math.floor(Math.random() * 9 + 2),
        style: Math.floor(Math.random() * 3),
      });

      callback();
    },
    [addActivity, callback],
  );

  if (isEmpty(userSettings)) return null;

  return (
    <>
      {SUGGESTIONS.map(({ value, label, restrictions }, index) => {
        if (restrictions) {
          if (!userSettings) return null;
          for (const key in restrictions) {
            if (userSettings[key] !== restrictions[key]) return null;
          }
        }

        return (
          <div key={`button-${index}`} className="u-sb-16">
            <Button
              onClick={handleClick}
              value={value}
              icon={isLight ? <PlusIconLight /> : <PlusIconDark />}
              className={
                isLight ? BUTTON.SQUARE.LARGE.PRIMARY : BUTTON.SQUARE.LARGE.CTA
              }
            >
              {label}
            </Button>
          </div>
        );
      })}
    </>
  );
};
