// import React from 'react';
import { PageNavLink } from '../PageNavLink/PageNavLink';

export const MainNav: React.FC = () => (
  <nav
    data-cy="Nav"
    className="navbar is-light is-fixed-top is-mobile has-shadow"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" textLink="Home" />
        <PageNavLink to="phones" textLink="Phones" />
        <PageNavLink to="tablets" textLink="Tablets" />
        <PageNavLink to="accessories" textLink="accessories" />

      </div>
    </div>
  </nav>
);