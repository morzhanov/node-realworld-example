export const validators = {
  passwordValidator: (pwd: string): boolean => !!(pwd && pwd.length > 7),

  passwordsValidator: (pwd: string, pwd2: string): boolean =>
    !!(pwd && pwd2 && pwd.length > 7 && pwd2.length > 7 && pwd === pwd2),

  emailValidator: (email: string): boolean => {
    // tslint:disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!re.test(String(email).toLowerCase());
  }
};
