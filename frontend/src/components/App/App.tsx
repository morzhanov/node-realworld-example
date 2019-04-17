import * as React from 'react';
import { History } from 'history';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from 'react-apollo';
import styled from '@emotion/styled';
import { IconContext } from 'react-icons/lib/cjs/iconContext';
import 'react-toastify/dist/ReactToastify.css';

import { client } from '@src/graphql/setup';
import Router from '@src/router';

const AppWrapper = styled.main`
  font-family: Roboto, Helvetica, sans-serif;
  font-weight: 400;
`;

const App = ({ history }: { history: History }) => (
  <ApolloProvider client={client}>
    <IconContext.Provider value={{ className: 'icon' }}>
      <AppWrapper>
        <Router history={history} />
        <ToastContainer hideProgressBar pauseOnHover />
      </AppWrapper>
    </IconContext.Provider>
  </ApolloProvider>
);

export default App;
