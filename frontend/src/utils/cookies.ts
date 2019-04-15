interface CookiesOptions {
  path?: string;
  expires?: Date | string | number;
  [key: string]: string | Date | undefined | boolean | number;
}

export default {
  get(name: string) {
    /* eslint-disable */
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    /* eslint-enable */

    return matches ? decodeURIComponent(matches[1]) : undefined;
  },

  set(name: string, val: string, options: CookiesOptions = {}) {
    if (!options.path) {
      options.path = '/';
    }

    let { expires } = options;

    if (typeof expires === 'number' && expires) {
      const d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = d;
      options.expires = d;
    }
    if (expires && expires instanceof Date) {
      options.expires = expires.toUTCString();
    }

    const value = encodeURIComponent(val);

    let updatedCookie = `${name}=${value}`;

    Object.keys(options).forEach(propName => {
      updatedCookie += `; ${propName}`;

      const propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += `= ${propValue}`;
      }
    });

    document.cookie = updatedCookie;
  },

  remove(name: string) {
    this.set(name, '', {
      expires: -1
    });
  }
};
