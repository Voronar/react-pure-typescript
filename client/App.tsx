/**
 * Application React component
 */
import * as React from 'react';
import { Link } from 'react-router';

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <div>item111</div>
        <Link to="/about">About1</Link>
        {this.props.children}
      </div>
    );
  }
}

