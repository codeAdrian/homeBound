import React from 'react';

interface Props {
  origin: 'user' | 'bot';
}

export const ChatMessage: React.FC<Props> = ({ children, origin }) => {
  const className =
    origin === 'user'
      ? 'chat__message chat__message--animated chat__message--user'
      : 'chat__message chat__message--animated chat__message--bot';

  return (
    <div className={className}>
      <span className="u-t__fontSize--small">{children}</span>
    </div>
  );
};
