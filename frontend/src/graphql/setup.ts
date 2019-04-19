import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { onError } from 'apollo-link-error';

import session from '../utils/session';
import helpers from '../utils/helpers';

const authMiddleware = new ApolloLink((operation: any, forward: any) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${session.get()}` || null
    }
  });

  return forward && forward(operation);
});

const logoutLink = onError((e: any) => {
  const { networkError, graphQLErrors } = e;
  if (
    (networkError && networkError.statusCode === 401) ||
    graphQLErrors.some((el: any) => el.message.statusCode === 401)
  ) {
    helpers.logOut();
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(
    concat(authMiddleware, new HttpLink({ uri: `${process.env.API_URL}/graphql` }))
  )
});
