export default {
  auth: {
    login: '/login',
    signup: '/signup'
  },
  home: '/',
  post: {
    create: '/post/create',
    edit: { link: (id: number) => `/post/${id}/edit`, path: '/post/:id/edit' },
    view: { link: (id: number) => `/post/${id}`, path: '/post/:id' }
  },
  profile: '/profile'
};
