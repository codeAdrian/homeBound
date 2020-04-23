import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { Heading, HEADING, Button, BUTTON, Card, Tabs } from 'components';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { useAppState } from 'modules/app';
import { useActivitiesServices, ActivityModal } from 'modules/activities';
import { useModalControls } from 'modules/modal';

export const Activities = () => {
  const [isModalOpen, { toggleModalState }] = useModalControls();
  const [{ userActivities }] = useActivitiesServices();
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
      <aside className="u-f--spaceBetween u-sb-40">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Activities
        </Heading>
        <Button
          icon={<PlusIcon />}
          className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
          onClick={() => false}
        />
      </aside>
      <main>
        <Tabs
          contentMain={
            <>
              {userActivities?.map((activity) => (
                <Card activity={activity} mode="list" />
              ))}
              <Button
                icon={<PlusIcon />}
                onClick={toggleModalState}
                className={BUTTON.SQUARE.LARGE.PRIMARY}
              >
                {userActivities && isEmpty(userActivities)
                  ? 'Add tasks'
                  : 'Add more tasks'}
              </Button>
              <ActivityModal
                isModalOpen={isModalOpen}
                toggleModalState={toggleModalState}
              />
            </>
          }
          contentSecondary={<div>secondary content</div>}
          titleMain="Your todo"
          titleSecondary="Completed activities"
        />
      </main>
    </section>
  );
};
