import * as React from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';
import { FormikProps } from 'formik';

import { withRest } from './AuthRest';
import withForm, { FormValues } from './AuthForm';
import { RouterProps } from 'react-router';
import routeUrls from '../../configs/routeUrls';
import Container from '../shared/Container';
import { FormItem } from '../shared/FormItem';
import { SubmitButton } from '../shared/SubmitButton';
import { BaseForm } from '../shared/BaseForm';
import session from '../../utils/session';
import cookies from '../../utils/cookies';

const { useEffect } = React;

const AuthWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const AuthContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ShowPassswordButton = styled.button`
  outline: none;
  border: none;
  width: 32px;
  background: none;
  position: absolute;
  right: 4px;
  top: 30px;
  cursor: pointer;
`;

const AlternativeMessage = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 16px;
  button {
    font-size: 16px;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 24px;
  button {
    margin: 0;
    width: 260px;
    margin-right: 18px;
    padding-left: 10px !important;
    padding-right: 10px !important;
    color: #fff !important;
    background: #000 !important;
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
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

  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      session.set(token);
      cookies.remove('token');
      window.location.reload();
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    push(authMode === AuthMode.LOGIN ? routeUrls.auth.signup : routeUrls.auth.login);
  };

  return (
    <AuthWrapper>
      <AuthContainer>
        <BaseForm>
          <h1>{authMode === AuthMode.LOGIN ? 'Sign In' : 'Sign Up'}</h1>
          <FormItem label="Email" name="email" type="email" touched={touched} errors={errors} />
          {authMode === AuthMode.SIGNUP && (
            <FormItem label="Name" name="name" touched={touched} errors={errors} />
          )}
          <FormItem
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            touched={touched}
            errors={errors}
          >
            <ShowPassswordButton type="button" onClick={toggleShowPassword}>
              {showPassword ? 'hide' : 'show'}
            </ShowPassswordButton>
          </FormItem>
          <AlternativeMessage>
            {authMode === AuthMode.LOGIN ? 'Not regitered ' : 'Already member'}?{' '}
            <button type="button" onClick={toggleAuthMode}>
              Sign {authMode === AuthMode.LOGIN ? 'Up' : 'In'}
            </button>
          </AlternativeMessage>
          <Buttons>
            <SubmitButton type="submit" disabled={isSubmitting && isValid}>
              {authMode === AuthMode.LOGIN ? 'Sign In' : 'Sign Up'}
            </SubmitButton>
            <SubmitButton type="button">
              <a href={`${process.env.API_URL}/api/auth/google`}>Login with Google</a>
            </SubmitButton>
          </Buttons>
        </BaseForm>
      </AuthContainer>
    </AuthWrapper>
  );
}

export default withRouter(withRest(withForm(Auth)));
