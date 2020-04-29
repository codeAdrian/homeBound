import { Suggestion } from 'modules/activities';

export const SUGGESTIONS: Suggestion[] = [
  {
    value: 'Excercise',
    label: 'Excercise',
  },
  { value: 'Eat a healthy meal', label: ' Eat healthy' },
  { value: 'Call a family member or a friend', label: 'Stay in touch' },
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
