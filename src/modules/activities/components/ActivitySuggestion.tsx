import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { Button, BUTTON } from 'components';
import { ReactComponent as PlusIconLight } from 'assets/icons/plus.svg';
import { ReactComponent as PlusIconDark } from 'assets/icons/plus_large.svg';
import { useSettingsServices, UserSettings } from 'modules/settings';
import { useActivitiesServices } from 'modules/activities';

interface Props {
  isLight?: boolean;
  callback: VoidFunction;
}

interface Suggestion {
  value: string;
  label: string;
  restrictions?: UserSettings;
}

const SUGGESTIONS: Suggestion[] = [
  {
    value: 'Excercise',
    label: 'Excercise',
  },
  { value: 'Eat a healthy meal', label: ' Eat healthy' },
  { value: 'Call a family member or a friend', label: 'Make a call' },
  {
    value: 'Play a board game with housemates',
    label: 'Board game',
    restrictions: { hasAssignedSelfIsolation: false, isLivingAlone: false },
  },
  {
    value: 'Play an online multiplayer game',
    label: 'Online game',
  },
  {
    value: 'Movie night with housemates',
    label: 'Movie night',
    restrictions: { hasAssignedSelfIsolation: false, isLivingAlone: false },
  },
  {
    value: 'Online movie watching with friends',
    label: 'Movie night',
    restrictions: { hasAssignedSelfIsolation: true, isLivingAlone: true },
  },
];

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
    [addActivity],
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
