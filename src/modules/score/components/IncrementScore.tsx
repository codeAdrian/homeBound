import React from 'react';

import { updateScoreHistory } from 'modules/score';

interface Props {
  user: firebase.UserInfo;
}

export const IncrementScore: React.FC<Props> = ({ user }: Props) => {
  const onClick = () => {
    const score = Math.floor(Math.random() * (10 - 1) + 1);
    updateScoreHistory(user, {
      date: new Date(),
      score: score,
      title: `Test - ${score}`,
    });
  };
  return (
    <div>
      <button onClick={onClick}>Increment Score randomly</button>
    </div>
  );
};
