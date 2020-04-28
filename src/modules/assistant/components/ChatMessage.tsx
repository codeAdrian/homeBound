import React from 'react';
import { Message } from 'twilio-chat/lib/message';

interface Props {
  origin: 'user' | 'bot';
  message: Message;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => Promise<void>;
}

export const ChatMessage: React.FC<Props> = ({
  children,
  origin,
  onClick,
  message,
}) => {
  const className =
    origin === 'user'
      ? 'chat__message chat__message--animated chat__message--user'
      : 'chat__message chat__message--animated chat__message--bot';

  return (
    <div onClick={onClick} data-value={message.body} className={className}>
      <span className="u-t__fontSize--small">{children}</span>
    </div>
  );
};
