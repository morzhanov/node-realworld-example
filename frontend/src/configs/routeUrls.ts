export default {
  auth: {
    login: '/login',
    signup: '/signup'
  },
  home: '/',
  post: {
    create: '/post/create',
    edit: { link: (id: number) => `/post/edit/${id}`, path: '/post/edit/:id' },
    view: { link: (id: number) => `/post/view/${id}`, path: '/post/view/:id' }
  },
  profile: '/profile'
};
