import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationResult } from 'react-apollo';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginData: { email: $email, password: $password }) {
      token
    }
  }
`;

const SIGNUP = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signup(loginData: { email: $email, password: $password, name: $name }) {
      token
    }
  }
`;

function withLogin(Component: any) {
  return (props: any) => (
    <Mutation mutation={LOGIN}>
      {(login: () => void, { data }: MutationResult<any>) => (
        <Component login={login} loginData={data} {...props} />
      )}
    </Mutation>
  );
}

function withSignUp(Component: any) {
  return (props: any) => (
    <Mutation mutation={SIGNUP}>
      {(login: () => void, { data }: MutationResult<any>) => (
        <Component signup={login} signUpData={data} {...props} />
      )}
    </Mutation>
  );
}

export function withGql(Component: any) {
  return (props: any) => withSignUp(withLogin(Component))(props);
}
