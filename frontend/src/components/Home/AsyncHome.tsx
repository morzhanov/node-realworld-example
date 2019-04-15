import * as React from 'react';
import * as Loadable from 'react-loadable';

export default Loadable({
  delay: 1000,
  loader: () => import('./Home'),
  loading: () => <div />
});
