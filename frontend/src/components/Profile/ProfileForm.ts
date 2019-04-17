import { FormikErrors, FormikBag, withFormik } from 'formik';
import { toast } from 'react-toastify';
import { History } from 'history';

import helpers from '../../utils/helpers';

export interface FormValues {
  email: string;
  name: string;
  [key: string]: string | boolean;
}

export interface FormProps {
  getProfileData: any;
  patchUser: (variables: any) => any;
  history: History;
}

export default function withForm(Component: any) {
  return withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({ email: '', name: '' }),
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
        await bag.props.patchUser({ variables: { ...values } });
        toast.success('Profile data changed');
        bag.setSubmitting(false);
      } catch (e) {
        if (e.graphQLErrors) {
          const errors = helpers.parseErrors(e.graphQLErrors);
          if (errors.nonFieldError) {
            toast.error(errors.nonFieldError);
          }
          bag.setErrors(errors);
        }
      }
    }
  })(Component);
}
