/**
 * Application React component
 */
import * as React from 'react';
// import { Link } from 'react-router-dom';

import Component from 'components/component/Component';

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="app">
        global
        <Component />
      </div>
    );
  }
}

