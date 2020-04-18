import React from 'react';

import { useMessageService } from 'modules/contacts';

const MessageForm = () => {
  const [state, { sendMessage }] = useMessageService();

  const onClick = () => {
    sendMessage({
      to: '+385911272581',
      body: 'Test message from twilio',
    });
  };

  return <button onClick={onClick}>Send message</button>;
};

export { MessageForm };
