import * as React from 'react';
import styled from '@emotion/styled';
import { Form, FormikProps, Field, FieldProps } from 'formik';
import { Input } from '@material-ui/core';

import { withGql } from './AuthGql';
import withForm, { FormValues } from './AuthForm';

const AuthWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

enum AuthMode {
  LOGIN,
  SIGNUP
}

function Auth({ touched, isSubmitting, isValid, errors }: FormikProps<FormValues>) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [authMode, setAuthMode] = React.useState(AuthMode.LOGIN);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN);
  };

  return (
    <AuthWrapper>
      <h1>{authMode === AuthMode.LOGIN ? 'Sign In' : 'Sign Up'}</h1>
      <Form>
        <div className="form-input-wrapper">
          <label>Email</label>
          <Field
            name="email"
            render={({ field }: { field: FieldProps }) => (
              <Input {...field} type="email" name="email" />
            )}
          />
          {touched.email && errors.email && <span className="error">{errors.email}</span>}
        </div>
        {authMode === AuthMode.SIGNUP && (
          <div className="form-input-wrapper">
            <label>Name</label>
            <Field
              name="name"
              render={({ field }: { field: FieldProps }) => (
                <Input {...field} type="text" name="name" />
              )}
            />
            {touched.email && errors.email && <span className="error">{errors.email}</span>}
          </div>
        )}
        <div className="form-input-wrapper">
          <label>Password</label>
          <Field
            name="password"
            render={({ field }: { field: FieldProps }) => (
              <Input {...field} type={showPassword ? 'text' : 'password'} name="password" />
            )}
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? 'hide' : 'show'}
          </button>
          {touched.password && errors.password && <span className="error">{errors.password}</span>}
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
    </AuthWrapper>
  );
}

export default withGql(withForm(Auth));
