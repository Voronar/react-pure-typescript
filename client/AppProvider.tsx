/**
 * Application provider
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import * as createLogger from 'redux-logger';

import { App } from './App';
import { Component } from './Component';

const reducer = combineReducers({
  store1: () => ({}),
});
const middleware: Middleware[] = [createLogger()];
const store = createStore(reducer, applyMiddleware(...middleware));
store.dispatch({type: 'action'});

export const AppProvider = () =>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/about" component={Component}/>
      </Route>
    </Router>
  </Provider>;
