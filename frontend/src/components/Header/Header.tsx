import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../images/headerLogo.svg';
import './Main.scss';
import { PageNavLink } from '../PageNavLink/PageNavLink';

type Props = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  clicked: boolean;
};

export const Header: React.FC<Props> = ({ onClick, clicked }) => {
  return (
    <header className="header">
      <div className="header__logo-n-nav">
        <a href="#" className="header__logo-link">
          <img
            className="header__logo"
            src={logo}
            alt="logo"
          ></img>
        </a>

        <nav className="menu">
          <ul className="menu__list">
            <li className="menu__item" >
              <PageNavLink to="/" textLink="Home" />
            </li>
            <li className="menu__item">
              <PageNavLink to="phones" textLink="Phones" />
            </li>
            <li className="menu__item">
              <PageNavLink to="tablets" textLink="Tablets" />
            </li>
            <li className="menu__item">
              <PageNavLink to="accessories" textLink="accessories" />
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__link-n-beg">
        <div className="header__liked-box">
          <NavLink to="favorits" className="header__liked"/>
        </div>

        <div className="header__beg-box">
          <NavLink to="cart" className="header__beg"/>
        </div>
      </div>

    
      <div className="header__menu-opener-box">
        <div 
          onClick={onClick} 
          className={classNames(
            'header__menu-opener',
            {'header__menu-opener--clicked' : clicked}
          )}
        ></div>
      </div>
    </header>
  );
};

// dasdas
