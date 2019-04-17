import * as React from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';
import { Form, FormikProps, Field, FieldProps } from 'formik';

import { withGql } from './AuthGql';
import withForm, { FormValues } from './AuthForm';
import { RouterProps } from 'react-router';
import routeUrls from '../../configs/routeUrls';
import Container from '../shared/Container';

const AuthWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  width: 200px;
`;

export enum AuthMode {
  LOGIN,
  SIGNUP
}

function Auth({
  touched,
  isSubmitting,
  isValid,
  errors,
  history: {
    location: { pathname },
    push
  }
}: FormikProps<FormValues> & RouterProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const authMode = pathname === routeUrls.auth.login ? AuthMode.LOGIN : AuthMode.SIGNUP;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    push(authMode === AuthMode.LOGIN ? routeUrls.auth.signup : routeUrls.auth.login);
  };

  return (
    <AuthWrapper>
      <Container>
        <h1>{authMode === AuthMode.LOGIN ? 'Sign In' : 'Sign Up'}</h1>
        <Form>
          <div>
            <label>Email</label>
            <Field name="email" type="email" />
            {touched.email && errors.email && <span>{errors.email}</span>}
          </div>
          {authMode === AuthMode.SIGNUP && (
            <div>
              <label>Name</label>
              <Field name="name" type="text" />
              {touched.email && errors.email && <span>{errors.name}</span>}
            </div>
          )}
          <div>
            <label>Password</label>
            <Field name="password" type={showPassword ? 'text' : 'password'} name="password" />
            <button type="button" onClick={toggleShowPassword}>
              {showPassword ? 'hide' : 'show'}
            </button>
            {touched.password && errors.password && <span>{errors.password}</span>}
          </div>
          <span>
            {authMode === AuthMode.LOGIN ? 'Not regitered ' : 'Already member'}?{' '}
            <button type="button" onClick={toggleAuthMode}>
              Sign {authMode === AuthMode.LOGIN ? 'Up' : 'In'}
            </button>
          </span>
          <div>
            <button type="submit" disabled={isSubmitting && isValid}>
              {authMode === AuthMode.LOGIN ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </Form>
      </Container>
    </AuthWrapper>
  );
}

export default withRouter(withGql(withForm(Auth)));
