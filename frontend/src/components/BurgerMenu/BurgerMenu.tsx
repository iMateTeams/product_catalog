import { NavLink } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import styles from '../Header/Header.module.scss';
import { PageNavLink } from '../PageNavLink/PageNavLink';


type Props = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  clicked: boolean,
};

export const BurgerMenu: React.FC<Props> = ({ onClick, clicked }) => {

  const scrollLock = () => {
    if (clicked) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'auto';
    }
  };

  scrollLock();

  return (
    <nav className={classNames(
      styles.burger_menu,
      { [styles.burger_menu__active] : clicked },
    )} 
    onClick={onClick}
    >
      <div className={styles.burger_menu__container}>
        <ul className={styles.burger_menu__list}>
          <li className={styles.burger_menu__item}>
            <PageNavLink to="/" textLink="Home" />
          </li>
          <li className={styles.burger_menu__item}>
            <PageNavLink to="phones" textLink="Phones" />
          </li>
          <li className={styles.burger_menu__item}>
            <PageNavLink to="tablets" textLink="Tablets" />
          </li>
          <li className={styles.burger_menu__item}>
            <PageNavLink to="accessories" textLink="accessories" />
          </li>
        </ul>

        <div className={styles.burger_menu__liked_n_beg}>
          <div className={styles.burger_menu__liked_box}>
            <NavLink to="liked" className="burger-menu__liked"/>
          </div>

          <div className={styles.burger_menu__beg_box}>
            <NavLink to="cart" className="burger-menu__beg"/>
          </div>
        </div>
      </div>
    </nav>
  );
};