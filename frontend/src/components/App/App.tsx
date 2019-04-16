import * as React from 'react';
import { History } from 'history';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from 'react-apollo';
import 'react-toastify/dist/ReactToastify.css';

import { client } from '@src/graphql/setup';
import Router from '@src/router';

const App = ({ history }: { history: History }) => (
  <ApolloProvider client={client}>
    <main>
      <Router history={history} />
      <ToastContainer hideProgressBar pauseOnHover />
    </main>
  </ApolloProvider>
);

export default App;
