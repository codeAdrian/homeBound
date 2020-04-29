import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Heading, HEADING } from 'components';
import { useAppState } from 'modules/app';
import { useAssistant, ChatMessage, ChatControls } from 'modules/assistant';
import { getUserData } from 'modules/user';
import { ReactComponent as SpeechBubbleIcon } from 'assets/icons/speech_bubble.svg';

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
        {state.isLoading && messages.length === 0 && (
          <div className="u-t-center chat__loading">
            <div>
              <div className="chat__loadingWrapper">
                <div className="chat__icon chat__icon--animated">
                  <SpeechBubbleIcon className="nav__icon u-ab-center" />
                </div>
              </div>
              <Heading tag="div" className={HEADING.SECONDARY.XLARGE.BOLD}>
                Couchy is waking up...
              </Heading>
            </div>
          </div>
        )}
        {messages?.map((item) => {
          const [firstAnswer, secondAnswer] = item.body.split('|');
          if (secondAnswer) {
            return (
              <ChatControls
                key={item.sid}
                onClick={api.postMessage}
                answerFirst={firstAnswer}
                answerSecond={secondAnswer}
              />
            );
          }

          return (
            <ChatMessage
              key={item.sid}
              origin={item.author === userData?.email ? 'user' : 'bot'}
            >
              {item.body}
            </ChatMessage>
          );
        })}
        <div ref={chatBottomRef} />
      </main>
    </section>
  );
};
