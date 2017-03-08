/**
 * App entry
 */

import { AppProvider } from './AppProvider';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

require('assets/styles/main.scss');

function bootstrap(): void {
  ReactDOM.render(
    <AppProvider />,
    document.getElementById('container'),
  );
}

bootstrap();

if (module.hot) {
  module.hot.accept('./AppProvider', () => {
    bootstrap();
  });
}
