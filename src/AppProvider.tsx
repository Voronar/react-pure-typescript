/**
 * Application provider
 */
import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import createStore from 'core/redux/createStore';
import { App } from 'App';

const store: Store<Core.IState> = createStore();

export const AppProvider: React.StatelessComponent<{}> = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
