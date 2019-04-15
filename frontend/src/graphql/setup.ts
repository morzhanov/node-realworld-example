import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import session from '../utils/session';

// TODO: logout on 401
// helpers.logOut();

const authMiddleware = new ApolloLink((operation: any, forward: any) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${session.get()}` || null
    }
  });

  return forward && forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, new HttpLink({ uri: process.env.API_URL }))
});
