import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Heading, HEADING } from 'components';
import { useAppState } from 'modules/app';
import { useAssistant, ChatMessage } from 'modules/assistant';
import { getUserData } from 'modules/user';

export const Assistant = () => {
  const chatBottomRef = React.useRef<HTMLDivElement>(null);
  const [state, api] = useAssistant();
  const { userData } = useSelector(getUserData);
  const [, { setAppTheme }] = useAppState();
  const { messages } = state;

  const handleMessagesUpdate = React.useCallback(() => {
    if (!chatBottomRef || !chatBottomRef.current) return;
    chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(handleMessagesUpdate, [messages]);

  useEffect(() => {
    setAppTheme({
      color: '#6A62FF',
      shapeClass: 'app__deco--default',
      showNav: true,
    });
  }, [setAppTheme]);

  return (
    <section className="app__content app--light">
      <aside className="u-f--spaceBetween u-sb-36">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Let's chat!
        </Heading>
      </aside>
      <main className="chat__wrapper">
        {messages?.items.map((item) => (
          <ChatMessage
            key={item.sid}
            message={item}
            onClick={api.postMessage}
            origin={item.author === userData?.email ? 'user' : 'bot'}
          >
            {item.body}
          </ChatMessage>
        ))}
        <div ref={chatBottomRef} />
      </main>
    </section>
  );
};
