import React from 'react';
import { Link } from 'react-router-dom';

import { Heading, HEADING } from 'components';
import { useAppState } from 'modules/app';
import { ReactComponent as BackIcon } from 'assets/icons/chevron_left.svg';
import { ChatMessage } from 'components/ChatMessage';

export const Assistant = () => {
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
