import * as React from 'react';
import styled from '@emotion/styled';
import { Typography, Input, TextField } from '@material-ui/core';
import { FormikProps, Form, Field, FieldProps } from 'formik';
import { withRouter, RouterProps } from 'react-router';

import { withGql } from './CreatePostGql';
import withForm, { FormValues } from './CreatePostForm';
import Container from '../shared/Container';

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
  handleChange,
  setFieldValue,
  errors
}: FormikProps<FormValues> & RouterProps) {
  return (
    <PageWrapper>
      <Container>
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
          <div>
            <label>Image</label>
            <Field
              name="image"
              type="file"
              onChange={(e: any) => {
                setFieldValue('file', e.target.files[0]);
                handleChange(e);
              }}
            />
            {touched.imageUrl && errors.imageUrl && <span>{errors.imageUrl}</span>}
          </div>
          <div>
            {/* <button type="submit" disabled={isSubmitting && isValid}> */}
            <button type="submit">Create</button>
          </div>
        </Form>
      </Container>
    </PageWrapper>
  );
}

export default withRouter(withGql(withForm(CreatePost)));
