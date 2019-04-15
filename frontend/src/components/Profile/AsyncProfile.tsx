import * as React from 'react';
import * as Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Profile'),
  loading: () => <div />
});
