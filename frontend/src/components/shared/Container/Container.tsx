import * as React from 'react';
import styled from '@emotion/styled';

const ContainerWrapper = styled.div`
  max-width: 1200px;
  width: calc(100% - 32px);
  padding-left: 16px;
  padding-right: 16px;
  margin: auto;
`;

const Container = ({ children }: { children: any }) => (
  <ContainerWrapper>{children}</ContainerWrapper>
);

export default Container;
