import * as React from 'react';
import styled from '@emotion/styled';
import { FormikProps, Form, Field } from 'formik';
import { defer } from 'lodash';
import { withRouter, RouterProps } from 'react-router';

import { withGql } from './CreatePostGql';
import withForm, { FormValues } from './CreatePostForm';
import Container from '../shared/Container';

const { useState } = React;

interface Props {
  getPostData?: any;
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

const Input = styled(Field)`
  width: 200px;
`;

const Textarea = styled(Field)`
  width: 200px;
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

function CreatePost({
  dirty,
  touched,
  isSubmitting,
  isValid,
  getPostData,
  loading,
  error,
  handleChange,
  setFieldValue,
  errors
}: FormikProps<FormValues> & RouterProps & Props) {
  if (error) return error;
  if (loading) return 'Loading...';

  const [fielImage, setFileImage] = useState();

  const isEdit = getPostData && getPostData.getPost;

  // TODO: add image for file

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
        <H1>{isEdit ? 'Edit' : 'Create'} post</H1>
        <Form>
          <div>
            <label>Title</label>
            <Input name="title" />
            {touched.title && errors.title && <span>{errors.title}</span>}
          </div>
          <div>
            <label>Content</label>
            <Textarea component="textarea" name="content" />
            {touched.content && errors.content && <span>{errors.content}</span>}
          </div>
          <div>
            <label>Image</label>
            {(imageUrl || fielImage) && (
              <FileImage style={{ backgroundImage: `url(${fielImage || imageUrl})` }} />
            )}
            <Field
              name="image"
              type="file"
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
            {touched.imageUrl && errors.imageUrl && <span>{errors.imageUrl}</span>}
          </div>
          <div>
            <button type="submit" disabled={isSubmitting && isValid}>
              {isEdit ? 'Edit' : 'Create'}
            </button>
          </div>
        </Form>
      </Container>
    </PageWrapper>
  );
}

export default withRouter(withGql(withForm(CreatePost)));
