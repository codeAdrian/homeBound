import React from 'react';

import { Heading, HEADING, Button, BUTTON, Tabs } from 'components';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { useAppState } from 'modules/app';
import {
  CompletedActivity,
  ActivityList,
  useActivitiesServices,
} from 'modules/activities';
import { useModalControls } from 'modules/modal';

export const Activities = () => {
  const [, { getActivities }] = useActivitiesServices();
  const [isModalOpen, { toggleModalState }] = useModalControls();
  const [, { setAppTheme }] = useAppState();

  React.useEffect(() => {
    getActivities();
  }, [getActivities]);

  React.useEffect(() => {
    setAppTheme({
      color: '#6A62FF',
      shapeClass: 'app__deco--default',
      showNav: true,
    });
  }, [setAppTheme]);

  return (
    <article className="app__content app--light">
      <aside className="u-f--spaceBetween u-sb-40">
        <Heading tag="h1" className={HEADING.PRIMARY.XXLARGE.LIGHT}>
          Activities
        </Heading>
        <Button
          icon={<PlusIcon />}
          className={BUTTON.ROUNDED.CTA.LARGE.GLOW}
          onClick={toggleModalState}
        />
      </aside>
      <main>
        <Tabs
          contentMain={
            <ActivityList
              isModalOpen={isModalOpen}
              toggleModalState={toggleModalState}
            />
          }
          contentSecondary={<CompletedActivity />}
          titleMain="Your todo"
          titleSecondary="Completed activities"
        />
      </main>
    </article>
  );
};
