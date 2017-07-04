/**
 * Application React component
 */
import * as React from 'react';
// import { Link } from 'react-router-dom';

// import Component from 'components/component/Component';
import TodoList from './TodoList';
import Todo from './Todo';

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="app">
        first todoStore connected component<TodoList serviceName="first" />
        second todoStore connected component<TodoList serviceName="second" />
        first todoStore connected component<Todo serviceName="first" />
      </div>
    );
  }
}
