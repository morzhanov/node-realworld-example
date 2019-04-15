import * as React from 'react';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

const HomeWrapper = styled.div`
  width: 100%;
  height: calc(100% - 129px);
`;

interface Author {
  name: string;
  id: number;
}

interface PostData {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: Author;
}

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      content
      imageUrl
      author {
        id
        name
      }
    }
  }
`;

function Home() {
  return (
    <Query query={GET_POSTS}>
      {({ loading, error, data: { getPosts } }: QueryResult<any, any>) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return (
          <HomeWrapper>
            Home
            {getPosts.map((post: PostData) => (
              <div>
                {post.author.id}
                {post.author.name}
                {post.id}
                {post.title}
                {post.content}
                {post.imageUrl}
              </div>
            ))}
          </HomeWrapper>
        );
      }}
    </Query>
  );
}

export default Home;
