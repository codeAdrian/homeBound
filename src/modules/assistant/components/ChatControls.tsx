import React from 'react';

import { Button, Letter, BUTTON } from 'components';

export const ChatControls = () => {
  return (
    <div className="chat__controls chat__message--animated chat__message--user">
      <div className="u-sb-16">
        <Button
          icon={<Letter>A</Letter>}
          className={BUTTON.PILL.SECONDARY.DEFAULT}
        >
          Yes, for sure
        </Button>
      </div>

      <div className="u-sb-16">
        <Button
          icon={<Letter>B</Letter>}
          className={BUTTON.PILL.SECONDARY.ACTIVE}
        >
          No, nope
        </Button>
      </div>
    </div>
  );
};
