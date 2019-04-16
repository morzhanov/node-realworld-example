import * as React from 'react';
import { Link } from 'react-router-dom';
import { Home, AccountCircle, ExitToApp, Add } from '@material-ui/icons';
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

const HomeIcon = styled(Home)`
  font-size: 40px !important;
  color: #000;
  margin-right: 18px;
  cursor: pointer;
` as typeof Home;

const AddIcon = styled(Add)`
  font-size: 40px !important;
  color: #000;
  cursor: pointer;
` as typeof Add;

const ProfileIcon = styled(AccountCircle)`
  font-size: 40px !important;
  color: #000;
  cursor: pointer;
  margin-right: 18px;
` as typeof AccountCircle;

const LogOutIcon = styled(ExitToApp)`
  font-size: 40px !important;
  color: #000;
  position: absolute;
  right: 50px;
  cursor: pointer;
` as typeof ExitToApp;

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
