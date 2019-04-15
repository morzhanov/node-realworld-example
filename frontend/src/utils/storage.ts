import cookies from './cookies';

export default {
  isLocalStorageSupported() {
    const storage = window.localStorage;
    const testKey = 'testLocalStorageFunctionality';
    let supported = true;

    try {
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
    } catch (error) {
      supported = false;
    }

    return !!supported;
  },

  get(key: string) {
    let value = this.isLocalStorageSupported()
      ? window.localStorage.getItem(key)
      : cookies.get(key);

    if (value) {
      value = JSON.parse(value);
    }

    return value;
  },

  set(key: string, data: any) {
    const value = JSON.stringify(data);

    if (this.isLocalStorageSupported()) {
      window.localStorage.setItem(key, value);
    } else {
      cookies.set(key, value);
    }
  },

  remove(key: string) {
    if (this.isLocalStorageSupported()) {
      window.localStorage.removeItem(key);
    } else {
      cookies.remove(key);
    }
  }
};
