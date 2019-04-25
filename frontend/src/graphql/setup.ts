import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from, split, concat } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { getOperationAST } from 'graphql';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

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

const wsClient = new SubscriptionClient(`${process.env.WS_URL}/graphql`, {
  connectionParams: {
    authorization: `Bearer ${session.get()}` || null
  },
  reconnect: true
});

const wsLink = new WebSocketLink(wsClient);

const logoutLink = onError((e: any) => {
  const { networkError, graphQLErrors } = e;
  if (
    (networkError && networkError.statusCode === 401) ||
    graphQLErrors.some((el: any) => el.message.statusCode === 401)
  ) {
    helpers.logOut();
  }
});

const mainLink = logoutLink.concat(
  concat(authMiddleware, new HttpLink({ uri: `${process.env.API_URL}/graphql` }))
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: split(
    (operation: any) => {
      const operationAST = getOperationAST(operation.query, operation.operationName);
      return !!operationAST && operationAST.operation === 'subscription';
    },
    wsLink,
    mainLink
  )
});
