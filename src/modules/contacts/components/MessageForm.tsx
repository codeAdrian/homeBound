import React from 'react';

import { useMessageService } from 'modules/contacts';

const MessageForm = () => {
  const [, { sendMessage }] = useMessageService();

  const onClick = () => {
    sendMessage({
      from: '+385911272581',
      to: '+385911272581',
      body: 'Test message from twilio',
    });
  };

  return <button onClick={onClick}>Send message</button>;
};

export { MessageForm };
