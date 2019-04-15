import * as React from 'react';
import { History } from 'history';
import { Router, Switch } from 'react-router';

import { Header } from '../components/shared/Header';
import { Footer } from '../components/shared/Footer';
import AsyncAuth from '../components/Auth/AsyncAuth';
import AsyncHome from '../components/Home/AsyncHome';
import AsyncAccount from '../components/Profile/AsyncProfile';
import routeUrls from '../configs/routeUrls';
import { AuthRoute, PrivateRoute } from './GuardRoutes';

const router = ({ history }: { history: History }) => (
  <Router history={history}>
    <>
      <Header />
      <Switch>
        <AuthRoute exact path={routeUrls.auth} render={() => <AsyncAuth />} />
        <PrivateRoute exact path={routeUrls.home} render={() => <AsyncHome />} />
        <PrivateRoute xact path={routeUrls.profile} render={() => <AsyncAccount />} />
      </Switch>
      <Footer />
    </>
  </Router>
);

export default router;
