/**
 * Root reducer
 */
import * as Redux from 'redux';

const reducer: Redux.Reducer<Core.IState> = Redux.combineReducers<Core.IState>({
  store1: () => ({}),
});

export default reducer;
