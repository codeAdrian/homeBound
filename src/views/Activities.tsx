import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { Heading, HEADING, Button, BUTTON, Card, Tabs } from 'components';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { useAppState } from 'modules/app';
import { useActivitiesServices } from 'modules/activities';

export const Activities = () => {
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
                className={BUTTON.SQUARE.LARGE.PRIMARY}
              >
                {userActivities && isEmpty(userActivities)
                  ? 'Add tasks'
                  : 'Add more tasks'}
              </Button>
            </>
          }
          contentSecondary={<div>secondary content</div>}
          titleMain="Title main"
          titleSecondary="Title secondary"
        />
      </main>
    </section>
  );
};
