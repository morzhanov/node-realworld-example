import * as React from 'react';
import { createBrowserHistory, History } from 'history';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './components/App';

const history: History = createBrowserHistory();

render(
  <AppContainer>
    <App history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;

    render(
      <AppContainer>
        <NextApp history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
