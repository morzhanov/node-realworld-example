import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationResult } from 'react-apollo';

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

const CREATE_SIGNED_URL = gql`
  mutation Signurl($filename: String!, $mimetype: String!) {
    signUrl(filename: $filename, mimetype: $mimetype)
  }
`;

function withCreatePost(Component: any) {
  return (props: any) => (
    <Mutation mutation={CREATE_POST}>
      {(createPost: () => void, { data }: MutationResult<any>) => (
        <Component createPost={createPost} createPostResult={data} {...props} />
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
  return (props: any) => withCreatePost(withSignedUrl(Component))(props);
}
