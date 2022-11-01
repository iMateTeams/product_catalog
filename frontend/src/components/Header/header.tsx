import logo from '../../images/headerLogo.svg';
import './header.css';

export const Header = () => (
  <header className="header">
    <div className="header__logo-n-nav">
      <a href="#" className="header_logo-link">
        <img
          className="header__logo"
          src={logo} 
          alt="logo"
        ></img>
      </a>

      <nav className="desktop-menu">
        <ul className="desktop-menu-list">
          <li className="desktop-menu-item">
            <a href="#" className="desktop-menu-link">
              Home
            </a>
          </li>
          <li className="desktop-menu-item">
            <a href="#" className="desktop-menu-link">
              Phones
            </a>
          </li>
          <li className="desktop-menu-item">
            <a href="#" className="desktop-menu-link">
              Tablets
            </a>
          </li>
          <li className="desktop-menu-item">
            <a href="#" className="desktop-menu-link">
              Accessories
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div className="header__link-n-beg">
      <div className="header__liked-box">
        <a href="#liked" className="header__liked"></a>
      </div>

      <div className="header__beg-box">
        <a href="#beg" className="header__beg"></a>
      </div>
    </div>

    <div className="header__menu-opener-box">
      <a href="#menu" className="header__menu-opener"></a>
    </div>
  </header>
);
