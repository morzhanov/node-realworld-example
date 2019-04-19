import { FormikErrors, FormikBag, withFormik } from 'formik';
import { toast } from 'react-toastify';
import { History } from 'history';

import session from '../../utils/session';
import helpers from '../../utils/helpers';
import routeUrls from '../../configs/routeUrls';
import { AuthMode } from './Auth';

export interface FormValues {
  email: string;
  password: string;
  name?: string;
  [key: string]: string | undefined;
}

export interface FormProps {
  login: (variables: any) => any;
  signup: (variables: any) => any;
  history: History;
}

export default function withForm(Component: any) {
  return withFormik<FormProps, FormValues>({
    mapPropsToValues: ({
      history: {
        location: { pathname }
      }
    }: FormProps) =>
      pathname === routeUrls.auth.login
        ? { email: '', password: '' }
        : { email: '', password: '', name: '' },

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
        const authMode =
          bag.props.history.location.pathname === routeUrls.auth.login
            ? AuthMode.LOGIN
            : AuthMode.SIGNUP;
        const fn = authMode === AuthMode.LOGIN ? bag.props.login : bag.props.signup;

        const { token } = await fn(values).then((res: Response) => res.json());
        session.set(token);
        location.reload();
      } catch (e) {
        const errors = helpers.parseErrors(e.graphQLErrors);
        if (errors.nonFieldError) {
          toast.error(errors.nonFieldError);
        }
        bag.setErrors(errors);
      }
    }
  })(Component);
}
