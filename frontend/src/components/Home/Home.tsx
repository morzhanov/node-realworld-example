import * as React from 'react';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { List, ListItem, Paper, Typography, CardMedia } from '@material-ui/core';

const HomeWrapper = styled.div`
  width: 100%;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const StyledList = styled(List)`
  overflow: scroll;
  padding-top: 16px;
  padding-bottom: 16px;
` as typeof List;

const StyledPapper = styled(Paper)`
  padding: 16px;
` as typeof Paper;

const H1 = styled(Typography)`
  width: 100%;
  text-align: center;
  margin-bottom: 32px !important;
` as typeof Typography;

const ItemTitle = styled(Typography)`
  margin-bottom: 12px !important;
` as typeof Typography;

const ItemContent = styled(Typography)`
  margin-bottom: 12px !important;
` as typeof Typography;

const ItemImage = styled(CardMedia)`
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
      {({ loading, error, data }: QueryResult<any, any>) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        const { getPosts } = data;

        return (
          <HomeWrapper>
            <H1 component="h1" variant="h3">
              Your posts
            </H1>
            <StyledList>
              {getPosts.map((post: PostData) => (
                <ListItem key={post.id}>
                  <StyledPapper>
                    <ItemImage src={post.imageUrl} image={post.imageUrl} />
                    <ItemTitle component="h5" variant="h5">
                      {post.title}
                    </ItemTitle>
                    <ItemContent component="p">{post.content.substring(0, 400)}&#8230;</ItemContent>
                    <AuthorName component="span">Author: {post.author.name}</AuthorName>
                  </StyledPapper>
                </ListItem>
              ))}
            </StyledList>
          </HomeWrapper>
        );
      }}
    </Query>
  );
}

export default Home;
