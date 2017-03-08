/**
 * Store
 */
import * as Redux from 'redux';
import { createLogger } from 'redux-logger';

import reducer from './reducer';

function createStore(): Redux.Store<Core.IState> {
  const middlewares: Redux.Middleware[] = [
    createLogger({
      collapsed: true,
    }),
  ];

  const store: Redux.Store<Core.IState> = Redux.createStore(reducer, Redux.applyMiddleware(...middlewares));

  return store;
}

export default createStore;
