import * as React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';

import Container from '../../shared/Container';

const FooterWrapper = styled.footer`
  height: 64px;
  background: #fff;
  border-top: 1px solid #ccc;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 16px;
`;

const Footer = () => (
  <FooterWrapper>
    <Container>
      <Typography component="p">Node Realworld Example</Typography>
    </Container>
  </FooterWrapper>
);

export default Footer;
