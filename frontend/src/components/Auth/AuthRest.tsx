import * as React from 'react';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData extends LoginData {
  name: string;
}

export function withRest(Component: any) {
  const BASE_URL = process.env.API_URL;
  const headers = { 'Content-Type': 'application/json' };

  const methods = {
    login: async (data: LoginData) =>
      fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
        mode: 'cors'
      }),

    signup: async (data: SignUpData) =>
      fetch(`${BASE_URL}/api/auth/signup`, {
        body: JSON.stringify(data),
        headers,
        mode: 'cors',
        method: 'POST'
      })
  };

  return (props: any) => <Component {...props} {...methods} />;
}
