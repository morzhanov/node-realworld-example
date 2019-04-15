import * as React from 'react';
import { History } from 'history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from '@src/router';

// TODO: add elements from material ui
const App = ({ history }: { history: History }) => (
  <main className="main">
    <Router history={history} />
    <ToastContainer hideProgressBar pauseOnHover />
  </main>
);

export default App;
