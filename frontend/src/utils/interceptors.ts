import axios from 'axios';
import helpers from './helpers';

interface ResponseError extends Error {
  response: any;
}

export const setupInterceptors = () =>
  axios.interceptors.response.use(
    (res: any) => res,
    (err: ResponseError) => {
      if (err.response && err.response.status === 401) {
        helpers.logOut();
      }
      return Promise.reject(err);
    }
  );
