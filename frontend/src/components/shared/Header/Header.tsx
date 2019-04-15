import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import routeUrls from '../../../configs/routeUrls';
import session from '../../../utils/session';

const HeaderWrapper = styled.header`
  height: 64px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ccc;
`;

type Props = {};

const Header = ({  }: Props) => {
  const isAuthenticated = session.isTokenSet();

  return isAuthenticated ? (
    <HeaderWrapper>
      <nav>
        <Link to={routeUrls.home}>Home</Link>
        <Link to={routeUrls.profile}>Profile</Link>
      </nav>
    </HeaderWrapper>
  ) : null;
};

export default Header;
