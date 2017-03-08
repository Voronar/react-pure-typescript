/**
 * App entry
 */
import { AppProvider } from './AppProvider';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const bootstrap = () => ReactDOM.render(

    <AppProvider />,

  document.getElementById('container')
);

bootstrap();

if (module.hot) {
  module.hot.accept('./AppProvider', () => {
    bootstrap();
  });
}
