import * as React from 'react';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { Paper, Typography, CardMedia } from '@material-ui/core';

const PostWrapper = styled.div`
  width: 100%;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const StyledPapper = styled(Paper)`
  padding: 16px;
` as typeof Paper;

const H1 = styled(Typography)`
  width: 100%;
  text-align: center;
  margin-bottom: 32px !important;
` as typeof Typography;

const PostContent = styled(Typography)`
  margin-bottom: 12px !important;
` as typeof Typography;

const PostImage = styled(CardMedia)`
  width: 140px;
  height: 140px;
  margin-right: 16px;
  float: left;
` as typeof CardMedia;

const AuthorName = styled(Typography)`
  font-size: 18px;
` as typeof Typography;

interface Author {
  name: string;
}

interface PostData {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  author: Author;
}

const GET_POST = gql`
  query GetPost($id: Float!) {
    getPost(id: $id) {
      id
      title
      content
      imageUrl
      createdAt
      author {
        name
      }
    }
  }
`;

function Post() {
  const postId = location.search.substr(1);
  return (
    <Query query={GET_POST} variables={{ postId }}>
      {({ loading, error, data }: QueryResult<any, any>) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        const { getPost }: { getPost: PostData } = data;
        const {
          title,
          content,
          imageUrl,
          createdAt,
          author: { name }
        } = getPost;

        return (
          <PostWrapper>
            <H1 component="h1" variant="h3">
              {title}
            </H1>
            <PostImage src={imageUrl} />
            <AuthorName>Author: {name}</AuthorName>
            {createdAt}
            <StyledPapper>
              <PostContent>{content}</PostContent>
            </StyledPapper>
          </PostWrapper>
        );
      }}
    </Query>
  );
}

export default Post;
