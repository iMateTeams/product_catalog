import { NavLink } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import '../Header/Main.scss';
import { PageNavLink } from '../PageNavLink/PageNavLink';


type Props = {
  burgerActive: boolean,
};

export const BurgerMenu: React.FC<Props> = ({ burgerActive }) => {
  return (
    <nav className={classNames(
      'burger-menu',
      {'burger-menu--active' : burgerActive},
    )}>
      <div className='burger-menu__container'>
        <ul className="burger-menu__list">
          <li className="burger-menu__item">
            <PageNavLink to="/" textLink="Home" />
          </li>
          <li className="burger-menu__item">
            <PageNavLink to="phones" textLink="Phones" />
          </li>
          <li className="burger-menu__item">
            <PageNavLink to="tablets" textLink="Tablets" />
          </li>
          <li className="burger-menu__item">
            <PageNavLink to="accessories" textLink="accessories" />
          </li>
        </ul>

        <div className="burger-menu__liked-n-beg">
          <div className="burger-menu__liked-box">
            <NavLink to="liked" className="burger-menu__liked"/>
          </div>

          <div className="burger-menu__beg-box">
            <NavLink to="cart" className="burger-menu__beg"/>
          </div>
        </div>
      </div>
    </nav>
  );
};