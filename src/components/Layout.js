import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderLogo from '../images/page-logo.png';
import css from './Layout.module.css';

export default function Layout() {
  return (
    <div>
      <header className={css.header}>
        <NavLink to="/">
          <img
            src={HeaderLogo}
            alt="logo"
            width="40"
            height="40"
            className={css.headerLogo}
          />
        </NavLink>
        <div className={css.navBar}>
          <NavLink to="/" className={css.navBarLink}>
            Home
          </NavLink>
          <NavLink to="/tweets" className={css.navBarLink}>
            Tweets
          </NavLink>
        </div>
      </header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
