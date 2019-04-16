import * as React from 'react';
import styled from '@emotion/styled';
import { Typography, Input, TextField } from '@material-ui/core';
import { FormikProps, Form, Field, FieldProps } from 'formik';
import { withRouter, RouterProps } from 'react-router';

import { withGql } from './CreatePostGql';
import withForm, { FormValues } from './CreatePostForm';

const PageWrapper = styled.div`
  width: 100%;
  min-height: calc(100% - 190px);
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: 16px;
`;

const H1 = styled(Typography)`
  width: 100%;
  text-align: center;
  margin-bottom: 32px !important;
` as typeof Typography;

function CreatePost({
  touched,
  isSubmitting,
  isValid,
  errors
}: FormikProps<FormValues> & RouterProps) {
  return (
    <PageWrapper>
      <H1 component="h1" variant="h3">
        Create new post
      </H1>
      <Form>
        <div>
          <label>Title</label>
          <Field
            name="title"
            render={({ field }: { field: FieldProps }) => (
              <Input {...field} type="text" name="title" />
            )}
          />
          {touched.title && errors.title && <span>{errors.title}</span>}
        </div>
        <div>
          <label>Content</label>
          <Field
            name="content"
            render={({ field }: { field: FieldProps }) => (
              <TextField {...field} type="text" name="content" multiline />
            )}
          />
          {touched.content && errors.content && <span>{errors.content}</span>}
        </div>
        {/* TODO: Add input type file and upload image */}
        <div>
          <label>Image</label>
          <Field
            name="imageUrl"
            render={({ field }: { field: FieldProps }) => (
              <Input {...field} type="text" name="imageUrl" />
            )}
          />
          {touched.imageUrl && errors.imageUrl && <span>{errors.imageUrl}</span>}
        </div>
        <div>
          <button type="submit" disabled={isSubmitting && isValid}>
            Create
          </button>
        </div>
      </Form>
    </PageWrapper>
  );
}

export default withRouter(withGql(withForm(CreatePost)));
