import axios from 'axios';

import { setupInterceptors } from './interceptors';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept-Language'] = 'en';
axios.defaults.baseURL = process.env.API_BASE_URL;

setupInterceptors();

const api = {
  get(url: string, params?: any) {
    return axios({
      method: 'GET',
      params,
      url
    });
  },

  post(url: string, data?: any) {
    return axios({
      data,
      method: 'POST',
      url
    });
  },

  patch(url: string, data?: any) {
    return axios({
      data,
      method: 'PATCH',
      url
    });
  },

  put(url: string, data?: any) {
    return axios({
      data,
      method: 'PUT',
      url
    });
  },

  delete(url: string, data?: any) {
    return axios({
      data,
      method: 'DELETE',
      url
    });
  },

  setHeader(name: string, data: any) {
    axios.defaults.headers[name] = data;
  }
};

export default api;
