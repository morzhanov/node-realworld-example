import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationResult, Query, QueryResult } from 'react-apollo';
import { GET_POST } from '../Post/Post';
import helpers from '../../utils/helpers';

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $imageUrl: String!) {
    createPost(createPostData: { title: $title, content: $content, imageUrl: $imageUrl }) {
      id
      title
      content
      imageUrl
      createdAt
      updatedAt
      author {
        id
        name
        email
        updatedAt
        createAt
      }
    }
  }
`;

const PATCH_POST = gql`
  mutation PatchPost($title: String!, $content: String!, $imageUrl: String!, $id: Float!) {
    patchPost(patchPostData: { title: $title, content: $content, imageUrl: $imageUrl, id: $id }) {
      id
      title
      content
      imageUrl
      createdAt
      updatedAt
      author {
        id
        name
        email
        updatedAt
        createAt
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($postId: Float!) {
    deletePost(postId: $postId)
  }
`;

const CREATE_SIGNED_URL = gql`
  mutation Signurl($filename: String!, $mimetype: String!) {
    signUrl(filename: $filename, mimetype: $mimetype)
  }
`;

function withGetPost(Component: any) {
  const postId = +helpers.getIdFromParams();
  if (!postId) {
    return (props: any) => <Component {...props} />;
  }

  return (props: any) => (
    <Query query={GET_POST} variables={{ id: +helpers.getIdFromParams() }}>
      {({ loading, error, data }: QueryResult<any, any>) => (
        <Component loading={loading} error={error} getPostData={data} {...props} />
      )}
    </Query>
  );
}

function withCreatePost(Component: any) {
  return (props: any) => (
    <Mutation mutation={CREATE_POST}>
      {(createPost: () => void, { data }: MutationResult<any>) => (
        <Component createPost={createPost} createPostResult={data} {...props} />
      )}
    </Mutation>
  );
}

function withPatchPost(Component: any) {
  return (props: any) => (
    <Mutation mutation={PATCH_POST}>
      {(patchPost: () => void, { data }: MutationResult<any>) => (
        <Component patchPost={patchPost} patchPostResult={data} {...props} />
      )}
    </Mutation>
  );
}

function withDeletePost(Component: any) {
  return (props: any) => (
    <Mutation mutation={DELETE_POST}>
      {(deletePost: () => void, { data }: MutationResult<any>) => (
        <Component deletePost={deletePost} deletePostResult={data} {...props} />
      )}
    </Mutation>
  );
}

function withSignedUrl(Component: any) {
  return (props: any) => (
    <Mutation mutation={CREATE_SIGNED_URL}>
      {(signUrl: () => void, { data }: MutationResult<any>) => (
        <Component createSignedUrl={signUrl} createSignedUrlResult={data} {...props} />
      )}
    </Mutation>
  );
}

export function withGql(Component: any) {
  return (props: any) =>
    withCreatePost(withPatchPost(withDeletePost(withSignedUrl(withGetPost(Component)))))(props);
}
