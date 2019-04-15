import axios from 'axios';

import storage from './storage';

export default {
  isTokenSet() {
    const authToken = storage.get('token');
    return authToken && !!authToken.trim();
  },

  setHeader() {
    if (this.isTokenSet()) {
      axios.defaults.headers.Authorization = `Token ${storage.get('token')}`;
    }
  },

  removeHeader() {
    axios.defaults.headers.Authorization = '';
  },

  set(tokenValue: string) {
    storage.set('token', tokenValue);
    this.setHeader();
  },

  remove() {
    storage.remove('token');
    this.removeHeader();
  }
};
