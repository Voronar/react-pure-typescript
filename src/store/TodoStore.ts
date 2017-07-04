/**
 * Todo store
 */

import * as Rx from 'rxjs/Rx';

import { IReactiveStore, TStateMapper, handleAction, ReactiveStore } from './utils';
import * as services from 'core/api/services';

const servs: any = services;

export interface ITodoState {
  list: services.ITodoItem[];
  listFetching: boolean;
}

export default class TodoStore implements IReactiveStore<ITodoState> {
  private initialState: ITodoState = {
    list: [],
    listFetching: false,
  };

  private store: ReactiveStore<ITodoState> = new ReactiveStore(this.initialState);

  private getTodos$: Rx.Subject<services.ITodoItem[]> = new Rx.Subject<services.ITodoItem[]>();
  private addTodo$: Rx.Subject<services.ITodoItem> = new Rx.Subject<services.ITodoItem>();
  private removeTodo$: Rx.Subject<number> = new Rx.Subject<number>();
  private listFetching$: Rx.Subject<boolean> = new Rx.Subject<boolean>();

  constructor() {
    this.store.handleActions(
      handleAction(this.listFetching$, this.handleListFetching),
      handleAction(this.getTodos$, this.handleGetTodos),
      handleAction(this.addTodo$, this.handleAddTodo),
      handleAction(this.removeTodo$, this.handleRemoveTodo),
    );
  }
  /**
   * @required
   */
  public subscribe(next?: (value: ITodoState) => void): Rx.Subscription {
    return this.store.subscribe(next);
  }
  /**
   * @required
   */
  public getInitialState(): ITodoState {
    return this.initialState;
  }
  /**
   * @action
   */
  public async getTodos(serviceName: string) {
    const state: ITodoState = await this.store.getState();

    console.log('getTodos', state);

    this.listFetching$.next(true);

    const items: services.ITodoItem[] = await servs[serviceName]();

    this.getTodos$.next(items);
  }
  /**
   * @reducer
   */
  private handleGetTodos(items: services.ITodoItem[]): TStateMapper<ITodoState> {
    return (state: ITodoState) => ({
      ...state,
      list: [...items],
      listFetching: false,
    });
  }
  /**
   * @reducer
   */
  private handleListFetching(fetching: boolean): TStateMapper<ITodoState> {
    return (state: ITodoState) => ({
      ...state,
      listFetching: fetching,
    });
  }
  /**
   * @action
   */
  public async addTodo(item: services.ITodoItem) {

    const state: ITodoState = await this.store.getState();

    console.log('addTodo', state);
    this.listFetching$.next(true);
    setTimeout(() => this.addTodo$.next(item), 500);
  }
  /**
   * @reducer
   */
  private handleAddTodo(item: services.ITodoItem): TStateMapper<ITodoState> {
    return (state: ITodoState) => ({
      ...state,
      list: [...state.list, item],
      listFetching: false,
    });
  }
  /**
   * @action
   */
  public removeTodo(removingItemId: number) {
    this.listFetching$.next(true);
    setTimeout(() => {
      this.removeTodo$.next(removingItemId);
    }, 500);
  }
  /**
   * @reducer
   */
  private handleRemoveTodo(removingItemId: number): TStateMapper<ITodoState> {
    return (state: ITodoState) => {
      const list: services.ITodoItem[] = state.list.filter((item: services.ITodoItem) => item.id !== removingItemId);

      return {
        ...state,
        list,
        listFetching: false,
      };
    };
  }
}
