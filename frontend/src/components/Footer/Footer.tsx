import React from 'react';
import logo from '../../images/headerLogo.svg';
import styles from './Footer.module.scss';

const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <a href="#">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <ul className={styles.footer__content}>
          <li className={styles.footer__content__item}>
            <a className={styles.footer__content__link} href="#">
              github
            </a>
          </li>
          <li className={styles.footer__content__item}>
            <a className={styles.footer__content__link} href="#">
              contacts
            </a>
          </li>
          <li className={styles.footer__content__item}>
            <a className={styles.footer__content__link} href="#">
              rights
            </a>
          </li>
        </ul>
        <div className={styles.footer__back_top}>
          <p className={styles.footer__back_top_text}>Back to top</p>
          <button className={styles.footer__back_top_link} onClick={toTop}></button>
        </div>
      </div>
    </div>
  );
};

// asdasdas
