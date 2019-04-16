import storage from './storage';

export default {
  isTokenSet() {
    const authToken = storage.get('token');
    return authToken && !!authToken.trim();
  },

  get() {
    return storage.get('token');
  },

  set(tokenValue: string) {
    storage.set('token', tokenValue);
  },

  remove() {
    storage.remove('token');
  }
};
