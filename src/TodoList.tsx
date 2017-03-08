/**
 * Todo list React component
 */
import * as React from 'react';

import TodoStore from './store/TodoStore';
import { connect } from './store/utils';

const todoStore: TodoStore = new TodoStore();

class TodoList extends React.Component<any, any> {
  constructor() {
    super();
  }
  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.todos.list.length !== this.props.todos.list.length && nextProps.todos.list.length === 0) {
      todoStore.getTodos();
    }
  }
  public componentDidMount(): void {
    todoStore.getTodos();
  }
  public render() {
    console.log('props', this.props);
    const list = this.props.todos.list.map((item: any, i: number) => (
      <li key={i}>
        {item.title}
        <button disabled={this.props.todos.listFetching} onClick={() => todoStore.removeTodo(item.id)}>x</button>
      </li>
    ));

    return (
      <div>
        <button
          disabled={this.props.todos.listFetching}
          onClick={() => todoStore.addTodo({ id: new Date().getTime(), title: `${new Date()}`})}
        >Add todo</button>
        <button
          disabled={this.props.todos.listFetching}
          onClick={() => todoStore.getTodos()}
        >Get initial todos</button>
        <span style={{ position: 'fixed'}}>
          {this.props.todos.listFetching && 'Loading...'}
        </span>
        <ul>{list}</ul>
      </div>
    );
  }
}

const connected: React.ComponentClass<{}> = connect({
  todos: todoStore,
})(TodoList);

export default connected;
