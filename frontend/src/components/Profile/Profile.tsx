import * as React from 'react';
import styled from '@emotion/styled';
import { FormikProps, Form, Field } from 'formik';
import { defer } from 'lodash';
import { withRouter, RouterProps } from 'react-router';

import { withGql } from './ProfileGql';
import withForm, { FormValues } from './ProfileForm';
import Container from '../shared/Container';

const { useState } = React;

interface Props {
  me?: any;
  patchUserDataResult: boolean;
  error: Error;
  loading: boolean;
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

const H1 = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 32px !important;
`;

function Profile({
  dirty,
  touched,
  isSubmitting,
  isValid,
  me,
  loading,
  error,
  handleSubmit,
  setFieldValue,
  errors
}: FormikProps<FormValues> & RouterProps & Props) {
  if (error) return error;
  if (loading) return 'Loading...';

  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);

  if (me && me.me && !dirty) {
    const {
      me: { email, name }
    } = me;
    defer(() => {
      setFieldValue('email', email);
      setFieldValue('name', name);
    });
  }

  return (
    <PageWrapper>
      <Container>
        <H1>Profile</H1>
        <Form>
          <div>
            <label>Email</label>
            <Input name="email" disabled={!edit} />
            {touched.email && errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>Name</label>
            <Input name="name" disabled={!edit} />
            {touched.name && errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <button
              type="button"
              disabled={isSubmitting && isValid}
              onClick={() => {
                if (edit) handleSubmit();
                defer(() => toggleEdit());
              }}
            >
              {edit ? 'Save' : 'Edit'}
            </button>
          </div>
        </Form>
      </Container>
    </PageWrapper>
  );
}

export default withRouter(withGql(withForm(Profile)));
