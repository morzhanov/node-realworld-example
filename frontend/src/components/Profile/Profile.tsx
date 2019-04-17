import * as React from 'react';
import styled from '@emotion/styled';
import { FormikProps } from 'formik';
import { defer } from 'lodash';
import { withRouter, RouterProps } from 'react-router';

import { withGql } from './ProfileGql';
import withForm, { FormValues } from './ProfileForm';
import Container from '../shared/Container';
import { FormItem } from '../shared/FormItem';
import { BaseForm } from '../shared/BaseForm';
import { SubmitButton } from '../shared/SubmitButton';

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

const H1 = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 32px !important;
`;

const Buttons = styled.div`
  display: flex;
  button {
    margin-right: 24px;
  }
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
        <BaseForm>
          <H1>Profile</H1>
          <FormItem label="Email" name="email" disabled={!edit} touched={touched} errors={errors} />
          <FormItem label="Name" name="name" disabled={!edit} touched={touched} errors={errors} />
          <Buttons>
            {edit && (
              <SubmitButton type="button" onClick={() => toggleEdit()}>
                Cancel
              </SubmitButton>
            )}
            <SubmitButton
              type="button"
              disabled={isSubmitting && isValid}
              onClick={() => {
                if (edit) handleSubmit();
                defer(() => toggleEdit());
              }}
            >
              {edit ? 'Save' : 'Edit'}
            </SubmitButton>
          </Buttons>
        </BaseForm>
      </Container>
    </PageWrapper>
  );
}

export default withRouter(withGql(withForm(Profile)));
