import { FormikErrors, FormikBag, withFormik } from 'formik';
import { toast } from 'react-toastify';
import qs from 'query-string';
import { History } from 'history';

import helpers from '../../utils/helpers';
import routeUrls from '../../configs/routeUrls';

export interface FormValues {
  content: string;
  image: string;
  file?: File;
  title: string;
  [key: string]: string | File | undefined;
}

export interface FormProps {
  createPost: (variables: any) => any;
  createSignedUrl: (variables: any) => any;
  createSignedUrlResult: any;
  history: History;
}

export default function withForm(Component: any) {
  return withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({ title: '', content: '', image: '' }),

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
        if (!values.file) return;

        const {
          data: { signUrl }
        } = await bag.props.createSignedUrl({
          variables: { filename: values.file.name, mimetype: values.file.type }
        });

        const credentials = qs.parse(signUrl.substring(signUrl.indexOf('?') + 1));

        const formData = new FormData();
        Object.keys(credentials).forEach((key: string) => formData.append(key, credentials[key]));
        formData.append('file', values.file);

        const res = await fetch(signUrl, {
          body: values.file,
          headers: {
            'content-type': 'multipart/form-data'
          },
          method: 'PUT'
        });

        const { url } = res;
        const { data } = await bag.props.createPost({
          variables: { ...values, imageUrl: url.substring(0, url.indexOf('?')) }
        });
        const {
          createPost: { id }
        } = data;
        // TODO: go to created post
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
