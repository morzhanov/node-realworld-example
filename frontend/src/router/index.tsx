import * as React from 'react';
import { History } from 'history';
import { Router, Switch } from 'react-router';

import { Header } from '../components/shared/Header';
import { Footer } from '../components/shared/Footer';
import { Auth } from '../components/Auth';
import { Home } from '../components/Home';
import { Profile } from '../components/Profile';
import routeUrls from '../configs/routeUrls';
import { AuthRoute, PrivateRoute } from './GuardRoutes';
import { Post } from '../components/Post';
import { CreatePost } from '../components/CreatePost';

const router = ({ history }: { history: History }) => (
  <Router history={history}>
    <>
      <Header />
      <Switch>
        <AuthRoute exact path={routeUrls.auth.login} render={() => <Auth />} />
        <AuthRoute exact path={routeUrls.auth.signup} render={() => <Auth />} />
        <PrivateRoute exact path={routeUrls.home} render={() => <Home />} />
        <PrivateRoute xact path={routeUrls.profile} render={() => <Profile />} />
        <PrivateRoute xact path={routeUrls.post.view.path} render={() => <Post />} />
        <PrivateRoute xact path={routeUrls.post.create} render={() => <CreatePost />} />
        <PrivateRoute xact path={routeUrls.post.edit.path} render={() => <CreatePost />} />
      </Switch>
      <Footer />
    </>
  </Router>
);

export default router;
