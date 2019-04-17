import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationResult, Query, QueryResult } from 'react-apollo';

import helpers from '../../utils/helpers';

const PATCH_USER = gql`
  mutation PatchUser($email: String!, $name: String!) {
    patchUser(patchUserData: { email: $email, name: $name }) {
      name
      email
    }
  }
`;

export const GET_USER = gql`
  query Me {
    me {
      name
      email
    }
  }
`;

function withGetUser(Component: any) {
  return (props: any) => (
    <Query query={GET_USER} variables={{ id: +helpers.getIdFromParams() }}>
      {({ loading, error, data }: QueryResult<any, any>) => (
        <Component loading={loading} error={error} me={data} {...props} />
      )}
    </Query>
  );
}

function withPatchUser(Component: any) {
  return (props: any) => (
    <Mutation mutation={PATCH_USER}>
      {(patchUser: () => void, { data }: MutationResult<any>) => (
        <Component patchUser={patchUser} patchUserResult={data} {...props} />
      )}
    </Mutation>
  );
}

export function withGql(Component: any) {
  return (props: any) => withPatchUser(withGetUser(Component))(props);
}
