import React from 'react';

import { Heading, HEADING } from 'components';
import { useAppState } from 'modules/app';
import { ChatMessage } from 'components/ChatMessage';
import { useAssistant } from 'modules/assistant';

export const Assistant = () => {
  useAssistant();
  const [, { setAppTheme }] = useAppState();

  React.useEffect(() => {
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
        <ChatMessage origin="bot">This is a bot message</ChatMessage>
        <ChatMessage origin="user">This is a bot message</ChatMessage>
      </main>
    </section>
  );
};
