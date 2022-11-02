import { NavLink } from 'react-router-dom';
import logo from '../../images/headerLogo.svg';
import './main.scss';
import { PageNavLink } from './PageNavLink';

export const Header = () => (
  <header className="header">
    <div className="header__logo-n-nav">
      <a href="#" className="header__logo-link">
        <img
          className="header__logo"
          src={logo} 
          alt="logo"
        ></img>
      </a>

      <nav className="desktop-menu">
        <ul className="desktop-menu__list">
          <li className="desktop-menu__item">
            <PageNavLink to="/" textLink="Home" />
          </li>
          <li className="desktop-menu__item">
            <PageNavLink to="phones" textLink="Phones" />
          </li>
          <li className="desktop-menu__item">
            <PageNavLink to="tablets" textLink="Tablets" />
          </li>
          <li className="desktop-menu__item">
            <PageNavLink to="accessories" textLink="accessories" />
          </li>
        </ul>
      </nav>
    </div>

    <div className="header__link-n-beg">
      <div className="header__liked-box">
        <a href="#liked" className="header__liked"></a>
      </div>

      <div className="header__beg-box">
        <NavLink to="cart" className="header__beg"/>
      </div>
    </div>

    <div className="header__menu-opener-box">
      <a href="#menu" className="header__menu-opener"></a>
    </div>
  </header>
);
