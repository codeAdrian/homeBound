import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as PersonIcon } from 'assets/icons/person.svg';
import { ReactComponent as DashboardIcon } from 'assets/icons/squares.svg';
import { ReactComponent as ActivitiesIcon } from 'assets/icons/trophy.svg';
import { ReactComponent as SpeechBubbleIcon } from 'assets/icons/speech_bubble.svg';
import { useAppState } from 'modules/app';

export const Navigation = () => {
  const [{ theme }] = useAppState();

  const navClassName = theme.showNav ? 'nav' : 'nav nav--hidden';

  return (
    <nav className={navClassName}>
      <NavLink
        to="/"
        exact
        className="nav__link"
        activeClassName="nav__link--active"
      >
        <DashboardIcon className="nav__icon" />
      </NavLink>
      <NavLink
        to="/activities"
        className="nav__link"
        activeClassName="nav__link--active"
      >
        <ActivitiesIcon className="nav__icon" />
      </NavLink>
      <NavLink
        to="/contacts"
        className="nav__link"
        activeClassName="nav__link--active"
      >
        <PersonIcon className="nav__icon" />
      </NavLink>
      <NavLink
        to="/assistant"
        className="nav__link"
        activeClassName="nav__link--active"
      >
        <SpeechBubbleIcon className="nav__icon" />
      </NavLink>
      <div
        className="nav__background"
        style={{ backgroundColor: theme.color }}
      />
    </nav>
  );
};
