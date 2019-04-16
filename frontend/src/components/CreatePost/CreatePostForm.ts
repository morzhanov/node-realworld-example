import { FormikErrors, FormikBag, withFormik } from 'formik';
import { toast } from 'react-toastify';
import { History } from 'history';

import helpers from '../../utils/helpers';
import routeUrls from '../../configs/routeUrls';

export interface FormValues {
  content: string;
  imageUrl: string;
  title: string;
  [key: string]: string;
}

export interface FormProps {
  createPost: (variables: any) => any;
  history: History;
}

export default function withForm(Component: any) {
  return withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({ title: '', content: '', imageUrl: '' }),

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
        const { data } = await bag.props.createPost({ variables: values });
        const {
          createPost: { id }
        } = data;
        // TODO: go to create post
        toast.success(`New Post with id = ${id} created`);
        bag.props.history.push(routeUrls.home);
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
