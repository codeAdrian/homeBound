import React, { useEffect } from 'react';

import { Heading, HEADING } from 'components';
import { useAppState } from 'modules/app';
import { useAssistant, ChatMessage } from 'modules/assistant';

export const Assistant = () => {
  const [messages, api] = useAssistant();
  const [, { setAppTheme }] = useAppState();

  useEffect(() => {
    setAppTheme({
      color: '#6A62FF',
      shapeClass: 'app__deco--default',
      showNav: true,
    });
  }, [setAppTheme]);

  useEffect(() => {
    api.getUserMessages();
    api.postMessage('Hi');
  }, [api]);

  return (
    <section className="app__content app--light">
      <aside className="u-f--spaceBetween u-sb-36">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Let's chat!
        </Heading>
      </aside>
      <main className="chat__wrapper">
        <ChatMessage origin="bot">This is a bot message</ChatMessage>
        <ChatMessage origin="user">This is a bot message</ChatMessage>
      </main>
    </section>
  );
};
