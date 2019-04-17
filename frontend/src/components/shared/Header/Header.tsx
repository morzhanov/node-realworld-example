import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaPowerOff, FaPlus } from 'react-icons/fa';
import styled from '@emotion/styled';

import routeUrls from '../../../configs/routeUrls';
import session from '../../../utils/session';
import helpers from '../../../utils/helpers';
import Container from '../../shared/Container';

const HeaderWrapper = styled.header`
  height: 64px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ccc;
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const HomeIcon = styled(FaHome)`
  font-size: 32px !important;
  color: #000;
  margin-right: 32px;
  cursor: pointer;
`;

const AddIcon = styled(FaPlus)`
  font-size: 32px !important;
  color: #000;
  cursor: pointer;
`;

const ProfileIcon = styled(FaUser)`
  font-size: 32px !important;
  color: #000;
  cursor: pointer;
  margin-right: 32px;
`;

const LogOutIcon = styled(FaPowerOff)`
  font-size: 32px !important;
  color: #000;
  position: absolute;
  right: 50px;
  cursor: pointer;
`;

type Props = {};

const Header = ({  }: Props) => {
  const isAuthenticated = session.isTokenSet();

  return isAuthenticated ? (
    <HeaderWrapper>
      <Container>
        <Nav>
          <Link to={routeUrls.home}>
            <HomeIcon />
          </Link>
          <Link to={routeUrls.profile}>
            <ProfileIcon />
          </Link>
          <Link to={routeUrls.post.create}>
            <AddIcon />
          </Link>
          <LogOutIcon onClick={helpers.logOut} />
        </Nav>
      </Container>
    </HeaderWrapper>
  ) : null;
};

export default Header;
