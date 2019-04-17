import * as React from 'react';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import * as dayjs from 'dayjs';
import { Query, QueryResult } from 'react-apollo';
import { FaEdit } from 'react-icons/fa';

import helpers from '../../utils/helpers';
import Container from '../shared/Container';
import { RouterProps } from 'react-router';
import routeUrls from '../../configs/routeUrls';

const PostWrapper = styled.div`
  width: 100%;
  min-height: calc(100% - 200px);
  padding-top: 32px;
  padding-bottom: 32px;
`;

const H1 = styled.h1`
  width: 100%;
  text-align: center;
  position: relative;
  margin-bottom: 32px !important;
`;

const EditIcon = styled(FaEdit)`
  font-size: 40px !important;
  position: absolute;
  right: 16px;
  color: #000;
  cursor: pointer;
`;

const PostContent = styled.p`
  margin-bottom: 12px !important;
  line-height: 24px !important;
`;

const Content = styled.div`
  width: 100%;
`;

const PostImage = styled.img`
  width: 100%;
  height: 500px;
`;

const PostInfo = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AuthorName = styled.span`
  font-size: 18px;
`;

const Date = styled.span`
  font-size: 18px;
`;

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

function Post({ history: { push } }: RouterProps) {
  return (
    <Query query={GET_POST} variables={{ id: +helpers.getIdFromParams() }}>
      {({ loading, error, data }: QueryResult<any, any>) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        const { getPost }: { getPost: PostData } = data;
        const {
          id,
          title,
          content,
          imageUrl,
          createdAt,
          author: { name }
        } = getPost;

        return (
          <PostWrapper>
            <Container>
              <H1>
                {title} <EditIcon onClick={() => push(routeUrls.post.edit.link(id))} />
              </H1>
              <PostImage src={imageUrl} />
              <Content>
                <PostInfo>
                  <AuthorName>Author: {name}</AuthorName>
                  <Date>{dayjs(createdAt).format('MMM DD YYYY')}</Date>
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

export default withRouter(Post);
