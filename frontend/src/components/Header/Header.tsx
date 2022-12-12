import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../images/headerLogo.svg';
import styles from './Header.module.scss';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import { useAppSelector } from '../../app/hooks';

type Props = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  clicked: boolean;
};

export const Header: React.FC<Props> = ({ onClick, clicked }) => {
  // const [inCart, setInCart] = useState(0);

  const productsInCart = useAppSelector(state => state.products.itemsInCart);
  const productsInLiked = useAppSelector(state => state.products.itemsLiked);

  // useEffect(() => {
  //   setInCart(productsInCart.length);
  // }, [productsInCart.length]);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo_n_nav}>
        <a href="#" className={styles.header__logo_link}>
          <img
            className={styles.header__logo}
            src={logo}
            alt="logo"
          ></img>
        </a>

        <nav className={styles.menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item} >
              <PageNavLink to="/" textLink="Home" />
            </li>
            <li className={styles.menu__item}>
              <PageNavLink to="phones" textLink="Phones" />
            </li>
            <li className={styles.menu__item}>
              <PageNavLink to="tablets" textLink="Tablets" />
            </li>
            <li className={styles.menu__item}>
              <PageNavLink to="accessories" textLink="accessories" />
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.header__link_n_beg}>
        <div className={styles.header__liked_box}>
          <NavLink to="liked" className={styles.header__liked} />
          {productsInLiked.length > 0 && 
            <div className={styles.header__amount}>{productsInLiked.length}</div>
          }
        </div>

        <div className={styles.header__beg_box}>
          <NavLink to="cart" className={styles.header__beg} />
          {productsInCart.length >0 && 
            <div className={styles.header__amount}>{productsInCart.length}</div>
          }
        </div>
      </div>

    
      <div className={styles.header__menu_opener_box}>
        <div 
          onClick={onClick} 
          className={classNames(
            styles.header__menu_opener,
            { [styles.header__menu_opener__clicked]: clicked }
          )}
        ></div>
      </div>
    </header>
  );
};
