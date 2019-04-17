import { FormikErrors, FormikBag, withFormik } from 'formik';
import { toast } from 'react-toastify';
import * as qs from 'query-string';
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
  getPostData: any;
  patchPost: (variables: any) => any;
  createPost: (variables: any) => any;
  createSignedUrl: (variables: any) => any;
  createSignedUrlResult: any;
  history: History;
}

export default function withForm(Component: any) {
  return withFormik<FormProps, FormValues>({
    mapPropsToValues: () => ({ title: '', content: '', image: '' }),
    validate: (values: FormValues) => {
      const isEdit = !!helpers.getIdFromParams();
      const errors: FormikErrors<FormValues> = {};
      const requiredMessage = 'This field is required';

      Object.keys(values).forEach((key: string) => {
        if (!values[key] && (!isEdit && key === 'image')) errors[key] = requiredMessage;
      });

      return errors;
    },

    handleSubmit: async (values: FormValues, bag: FormikBag<FormProps, FormValues>) => {
      try {
        const isEdit = bag.props.getPostData && bag.props.getPostData.getPost;

        if (!isEdit && !values.file) return;

        let fileUrl;
        if (values.file) {
          const {
            data: { signUrl }
          } = await bag.props.createSignedUrl({
            variables: { filename: values.file.name, mimetype: values.file.type }
          });

          const credentials: any = qs.parse(signUrl.substring(signUrl.indexOf('?') + 1));

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

          fileUrl = res.url;
        }

        const fn = isEdit ? bag.props.patchPost : bag.props.createPost;
        const imageUrl = fileUrl
          ? fileUrl.substring(0, fileUrl.indexOf('?'))
          : bag.props.getPostData.getPost.imageUrl;
        const variables: any = { ...values, imageUrl };
        if (isEdit) variables.id = bag.props.getPostData.getPost.id;

        const { data } = await fn({ variables });
        const id = isEdit ? data.patchPost.id : data.createPost.id;

        toast.success(`Post with id = ${id} ${isEdit ? 'edited' : 'created'}`);
        bag.props.history.push(routeUrls.post.view.link(id));
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
