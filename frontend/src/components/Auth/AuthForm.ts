import { FormikErrors, FormikBag, withFormik } from 'formik';
import { toast } from 'react-toastify';

import session from '../../utils/session';
import helpers from '../../utils/helpers';

export interface FormValues {
  email: string;
  password: string;
  [key: string]: string;
}

export interface FormProps {
  login: (variables: any) => any;
  signup: (variables: any) => any;
  emailError?: string;
  passwordError?: string;
}

export default function withForm(Component: any) {
  return withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({ email: '', password: '' }),

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
  })(Component);
}
