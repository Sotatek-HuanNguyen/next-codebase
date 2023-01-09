import React from 'react';

import AppLang from '../AppLang';
import NavLink from './NavLink';
import styles from './styles.module.scss';

const MainMenu = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <NavLink href="/">
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink href="/about">
            <span>About</span>
          </NavLink>
        </li>
        <li>
          <NavLink href="/login">
            <span>Login</span>
          </NavLink>
        </li>
      </ul>

      <AppLang />
    </nav>
  );
};

export default MainMenu;
