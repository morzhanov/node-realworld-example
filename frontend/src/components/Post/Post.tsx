import * as React from 'react';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import * as dayjs from 'dayjs';
import { Query, QueryResult } from 'react-apollo';
import { Typography, CardMedia } from '@material-ui/core';

import helpers from '../../utils/helpers';
import Container from '../shared/Container';

const PostWrapper = styled.div`
  width: 100%;
  min-height: calc(100% - 200px);
  padding-top: 32px;
  padding-bottom: 32px;
`;

const H1 = styled(Typography)`
  width: 100%;
  text-align: center;
  margin-bottom: 32px !important;
` as typeof Typography;

const PostContent = styled(Typography)`
  margin-bottom: 12px !important;
  line-height: 24px !important;
` as typeof Typography;

const Content = styled.div`
  width: 100%;
`;

const PostImage = styled(CardMedia)`
  width: 100%;
  height: 500px;
` as typeof CardMedia;

const PostInfo = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AuthorName = styled(Typography)`
  font-size: 18px;
` as typeof Typography;

const Date = styled(Typography)`
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
        id
        name
      }
    }
  }
`;

function Post() {
  const id = +helpers.getIdFromParams();
  return (
    <Query query={GET_POST} variables={{ id }}>
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
            <Container>
              <H1 component="h1" variant="h3">
                {title}
              </H1>
              <PostImage image={imageUrl} src={imageUrl} />
              <Content>
                <PostInfo>
                  <AuthorName component="span">Author: {name}</AuthorName>
                  <Date component="span">{dayjs(createdAt).format('MMM DD YYYY')}</Date>
                </PostInfo>
                <PostContent>{content}</PostContent>
              </Content>
            </Container>
          </PostWrapper>
        );
      }}
    </Query>
  );
}

export default Post;
