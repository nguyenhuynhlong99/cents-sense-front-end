import { List, X } from '@phosphor-icons/react';

import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import styles from './Nav.module.css';
import Logo from '../Logo';

const MobileNavLink = styled(NavLink)`
  text-transform: capitalize;
  font-size: 30px;
  line-height: 36px;
  transition: color 200ms ease-out;

  &:focus,
  &:hover {
    color: #4ade80;
  }
`;

function Nav() {
  return (
    <nav className="flex items-center justify-between p-3 sm:p-[30px]">
      <Link to="/" className="outline-none">
        <Logo />
      </Link>

      <input id={styles.mobileToggle} type="checkbox" className="hidden" />
      <label htmlFor={styles.mobileToggle} className="cursor-pointer lg:hidden">
        <List size={32} color="#eee" />
      </label>

      {/* Mobile Nav */}
      <div className={styles.mobileNav}>
        <label htmlFor={styles.mobileToggle} style={{ marginLeft: 'auto' }}>
          <X
            size={50}
            color="#eee"
            style={{ cursor: 'pointer', marginLeft: 'auto' }}
          />
        </label>
        <ul className={styles.mobileNavLinkList}>
          <li>
            <MobileNavLink to="/howitwork">how it work</MobileNavLink>
          </li>
          <li>
            <MobileNavLink to="/about">about</MobileNavLink>
          </li>
          <li>
            <MobileNavLink to="/login">log in</MobileNavLink>
          </li>
        </ul>
      </div>

      <ul className="hidden lg:flex gap-5 items-center">
        <li>
          <NavLink
            to="/howitwork"
            className="capitalize text-lg hover:text-green-400 transition-all duration-200 ease-linear"
          >
            how it work
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="capitalize text-lg hover:text-green-400 transition-all duration-200 ease-linear"
          >
            about
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className="capitalize text-lg hover:text-green-400 transition-all duration-200 ease-linear"
          >
            log in
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
