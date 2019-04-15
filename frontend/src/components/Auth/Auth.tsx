import * as React from 'react';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { withFormik, FormikErrors, Form, FormikBag, FormikProps, Field, FieldProps } from 'formik';
import { Input } from '@material-ui/core';
import { Mutation, MutationResult } from 'react-apollo';
import helpers from '../../utils/helpers';
import { toast } from 'react-toastify';
import session from '../../utils/session';

const AuthWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginData: { email: $email, password: $password }) {
      token
    }
  }
`;

interface FormValues {
  email: string;
  password: string;
  [key: string]: string;
}

interface OtherProps {
  emailError?: string;
  passwordError?: string;
  loginData?: any;
}

interface FormProps {
  login: (variables: any) => any;
  emailError?: string;
  passwordError?: string;
}

function withMutation(Component: any) {
  return (props: OtherProps) => (
    <Mutation mutation={LOGIN}>
      {(login: () => void, { data }: MutationResult<any>) => (
        <Component login={login} loginData={data} {...props} />
      )}
    </Mutation>
  );
}

function InnerForm({
  touched,
  isSubmitting,
  isValid,
  loginData,
  errors
}: OtherProps & FormikProps<FormValues>) {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthWrapper>
      <Form>
        <div className="form-input-wrapper">
          <label>New password</label>
          <Field
            name="email"
            render={({ field }: { field: FieldProps }) => (
              <Input {...field} type="email" name="email" />
            )}
          />
          {touched.email && errors.email && <span className="error">{errors.email}</span>}
        </div>
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
        <button type="submit" disabled={isSubmitting && isValid}>
          Save
        </button>
        {loginData && JSON.stringify(loginData)}
      </Form>
    </AuthWrapper>
  );
}

const Auth = withMutation(
  withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({ email: '', password: '' }),

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};
      const requiredMessage = 'This field is required';

      Object.keys(values).forEach((key: string) => {
        if (!values[key]) errors[key] = requiredMessage;
      });

      return errors;
    },

    handleSubmit: async (values: FormValues, bag: FormikBag<FormProps, FormValues>) => {
      try {
        const { data } = await bag.props.login({
          variables: { email: values.email, password: values.password }
        });
        session.set(data.login.token);
        session.setHeader();
        location.reload();
      } catch (e) {
        const errors = helpers.parseErrors(e.graphQLErrors);
        if (errors.nonFieldError) {
          toast.error(errors.nonFieldError);
        }
        bag.setErrors(errors);
      }
    }
  })(InnerForm)
);

export default Auth;
