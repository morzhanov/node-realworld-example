import * as React from 'react';
import styled from '@emotion/styled';
import { FormikProps } from 'formik';
import { defer } from 'lodash';
import { withRouter, RouterProps } from 'react-router';

import { withGql } from './CreatePostGql';
import withForm, { FormValues } from './CreatePostForm';
import Container from '../shared/Container';
import { BaseForm } from '../shared/BaseForm';
import { FormItem } from '../shared/FormItem';
import { SubmitButton } from '../shared/SubmitButton';
import { toast } from 'react-toastify';
import routeUrls from '../../configs/routeUrls';

const { useState } = React;

interface Props {
  getPostData?: any;
  deletePost?: (variables: any) => any;
  deletePostResult?: any;
  loading: boolean;
  error: Error;
}

export enum PostMode {
  CREATE,
  EDIT
}

const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100% - 190px);
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: 16px;
`;

const FileImage = styled.div`
  width: 200px;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const H1 = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 32px !important;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 24px;
`;

const DeleteButton = styled(SubmitButton)`
  background: #e00;
  margin-left: 24px;
`;

function CreatePost({
  dirty,
  touched,
  isSubmitting,
  isValid,
  deletePost,
  getPostData,
  loading,
  error,
  deletePostResult,
  history: { push },
  handleChange,
  setFieldValue,
  errors
}: FormikProps<FormValues> & RouterProps & Props) {
  if (error) return error;
  if (loading) return 'Loading...';
  if (deletePostResult) {
    toast.success('Post successfully deleted');
    push(routeUrls.home);
    return null;
  }

  const [fielImage, setFileImage] = useState();
  const isEdit = getPostData && getPostData.getPost;
  const imageUrl = getPostData && getPostData.getPost ? getPostData.getPost.imageUrl : '';

  if (isEdit && !dirty) {
    const {
      getPost: { title, content }
    } = getPostData;
    defer(() => {
      setFieldValue('title', title);
      setFieldValue('content', content);
    });
  }

  return (
    <PageWrapper>
      <Container>
        <BaseForm>
          <H1>{isEdit ? 'Edit' : 'Create'} post</H1>
          {(imageUrl || fielImage) && (
            <FileImage style={{ backgroundImage: `url(${fielImage || imageUrl})` }} />
          )}
          <FormItem
            label="Image"
            type="file"
            name="image"
            touched={touched}
            errors={errors}
            onChange={(e: any) => {
              if (FileReader && e.target.files && e.target.files.length) {
                const fr = new FileReader();
                fr.onload = () => {
                  setFileImage(fr.result);
                };
                fr.readAsDataURL(e.target.files[0]);
              }

              setFieldValue('file', e.target.files[0]);
              handleChange(e);
            }}
          />
          <FormItem label="Title" name="title" touched={touched} errors={errors} />
          <FormItem
            type="textarea"
            label="Content"
            name="content"
            component="textarea"
            touched={touched}
            errors={errors}
          />
          <Buttons>
            <SubmitButton type="submit" disabled={isSubmitting && isValid}>
              {isEdit ? 'Edit' : 'Create'}
            </SubmitButton>
            {isEdit && deletePost && (
              <DeleteButton
                type="button"
                disabled={isSubmitting}
                onClick={() => deletePost({ variables: { postId: getPostData.getPost.id } })}
              >
                Delete Post
              </DeleteButton>
            )}
          </Buttons>
        </BaseForm>
      </Container>
    </PageWrapper>
  );
}

export default withRouter(withGql(withForm(CreatePost)));
