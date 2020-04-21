import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as PersonIcon } from 'assets/icons/person.svg';
import { useAppState } from 'modules/app';

export const Navigation = () => {
  const [{ theme }] = useAppState();

  const navClassName = theme.showNav ? 'nav' : 'nav nav--hidden';

  return (
    <nav className={navClassName}>
      <NavLink to="/1" className="nav__link" activeClassName="">
        <PersonIcon className="nav__icon" />
      </NavLink>
      <NavLink to="/" className="nav__link" activeClassName="nav__link--active">
        <PersonIcon className="nav__icon" />
      </NavLink>
      <NavLink to="/3" className="nav__link" activeClassName="">
        <PersonIcon className="nav__icon" />
      </NavLink>
      <NavLink to="/4" className="nav__link" activeClassName="">
        <PersonIcon className="nav__icon" />
      </NavLink>
      <div
        className="nav__background"
        style={{ backgroundColor: theme.color }}
      />
    </nav>
  );
};
