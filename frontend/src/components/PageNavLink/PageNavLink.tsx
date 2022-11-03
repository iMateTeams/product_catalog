import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../Header/Header.module.scss';

type Props = {
  to: string;
  textLink: string;
};

export const PageNavLink: React.FC<Props> = ({
  to, textLink,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      styles.menu__link,
      { [styles.is_active]: isActive },
    )}
  >
    {textLink}
  </NavLink>
);