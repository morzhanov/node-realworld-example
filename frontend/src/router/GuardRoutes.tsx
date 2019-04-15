import * as React from 'react';
import { Route, Redirect } from 'react-router';
import session from '../utils/session';
import routeUrls from '../configs/routeUrls';

export const PrivateRoute = ({ render, ...rest }: any) => (
  <Route
    {...rest}
    render={(props: any) =>
      session.isTokenSet() ? render(props) : <Redirect to={routeUrls.auth.login} />
    }
  />
);

export const AuthRoute = ({ render, ...rest }: any) => (
  <Route
    {...rest}
    render={(props: any) =>
      !session.isTokenSet() ? render(props) : <Redirect to={routeUrls.home} />
    }
  />
);
