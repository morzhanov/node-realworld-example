import * as React from 'react';
import { Link } from 'react-router-dom';

import routeUrls from '../../../configs/routeUrls';
import session from '../../../utils/session';

type Props = {};

// TODO: add elements from material ui
const Header = ({  }: Props) => {
  const isAuthenticated = session.isTokenSet();

  return (
    <header className="header">
      <div className="container">
        {isAuthenticated && (
          <nav className="header__nav">
            <Link to={routeUrls.home}>Home</Link>
            <Link to={routeUrls.profile}>Profile</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
