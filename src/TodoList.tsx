/**
 * Todo list React component
 */
import * as React from 'react';
import { connect } from './store/utils';

import * as Stores from './store';
// import { ITodoState } from './store/TodoStore';

const stores: any = Stores;

class TodoList extends React.Component<any, any> {
  constructor() {
    super();
  }
  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.todos.list.length !== this.props.todos.list.length && nextProps.todos.list.length === 0) {
      stores[this.props.serviceName].getTodos(this.props.serviceName);
    }
  }
  public componentDidMount(): void {
    stores[this.props.serviceName].getTodos(this.props.serviceName);
  }
  public render() {
    console.log('props', this.props);
    const list = this.props.todos.list.map((item: any, i: number) => (
      <li key={i}>
        {item.title}
        <button disabled={this.props.todos.listFetching} onClick={() => stores[this.props.serviceName].removeTodo(item.id)}>x</button>
      </li>
    ));

    return (
      <div>
        <button
          disabled={this.props.todos.listFetching}
          onClick={() => stores[this.props.serviceName].addTodo({ id: new Date().getTime(), title: `${new Date()}`})}
        >Add todo
        </button>
        <button
          disabled={this.props.todos.listFetching}
          onClick={() => stores[this.props.serviceName].getTodos(this.props.serviceName)}
        >Get initial todos
        </button>
        <span style={{ position: 'fixed'}}>
          {this.props.todos.listFetching && 'Loading...'}
        </span>
        <ul>{list}</ul>
      </div>
    );
  }
}

const connected: React.ComponentClass<any> = connect({
  todos: props => stores[props.serviceName],
})(TodoList);

export default connected;
