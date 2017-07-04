/**
 *
 */
import * as React from 'react';

import { connect } from './store/utils';
import * as Stores from './store';

const stores: any = Stores;

const TodoSFC: React.SFC<any> = props => {
  return (
    <div>
      <button onClick={() => stores[props.serviceName].getTodos(props.serviceName)}>Reset</button>
      {`Count: ${props.todos.list.length}`}
    </div>
  );
};

const connected: React.ComponentClass<any> = connect({
  todos: props => stores[props.serviceName],
})(TodoSFC);

export default connected;
