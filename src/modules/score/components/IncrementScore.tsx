import React from 'react';

import { updateScoreHistory } from 'modules/score';

interface Props {
  user: firebase.UserInfo;
}

export const IncrementScore: React.FC<Props> = ({ user }: Props) => {
  const onClick = async () => {
    const score = Math.floor(Math.random() * (10 - 1) + 1);
    await updateScoreHistory(user, {
      date: new Date(),
      score: score,
      title: `Test - ${score}`,
    });
  };
  return (
    <div>
      <button onClick={onClick}>Increment Score +10</button>
    </div>
  );
};
