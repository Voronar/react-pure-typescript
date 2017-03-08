/**
 * Todo store
 */

import * as Rx from 'rxjs/Rx';

import { IStore, reducer } from './utils';

export interface ITodoItem {
  id: number;
  title: string;
  description?: string;
}

export interface ITodoState {
  list: ITodoItem[];
  listFetching: boolean;
}

type IStateMapper = (state: ITodoState) => ITodoState;

function getTodoService(): Promise<ITodoItem[]> {
  return new Promise<ITodoItem[]>((resolve: (value: ITodoItem[]) => Promise<ITodoItem[]>) =>
    setTimeout(() => resolve([
      {
        id: 1,
        title: 'buy eggs',
        description: 'chicken eggs',
      },
    ]), 1000));
}

export function reduceObservables<IState>(initialState: IState, ...observables: Rx.Observable<IState>[]): Rx.Observable<IState> {
  return Rx.Observable
    .merge<IStateMapper>(...observables)
    .scan<IStateMapper, IState>(reducer, initialState)
    .share();
}

export default class TodoStore implements IStore<ITodoState> {
  private initialState: ITodoState = {
    list: [],
    listFetching: false,
  };

  private getTodos$: Rx.Subject<ITodoItem[]> = new Rx.Subject<ITodoItem[]>();
  private addTodo$: Rx.Subject<ITodoItem> = new Rx.Subject<ITodoItem>();
  private removeTodo$: Rx.Subject<number> = new Rx.Subject<number>();
  private listFetching$: Rx.Subject<boolean> = new Rx.Subject<boolean>();
  private rootObservable$: Rx.Observable<ITodoState>;

  constructor() {
    this.rootObservable$ = Rx.Observable.merge<IStateMapper>(
      this.listFetching$.map<boolean, IStateMapper>(this.handleListFetching),
      this.getTodos$.map<ITodoItem[], IStateMapper>(this.handleGetTodos),
      this.addTodo$.map<ITodoItem, IStateMapper>(this.handleAddTodo),
      this.removeTodo$.map<number, IStateMapper>(this.handleRemoveTodo),
    )
    .scan<IStateMapper, ITodoState>(reducer, this.initialState)
    .share();
  }
  public subscribe(next?: (value: ITodoState) => void): Rx.Subscription {
    return this.rootObservable$.subscribe(next);
  }
  public getInitialState(): ITodoState {
    return this.initialState;
  }
  /**
   * @action
   */
  public async getTodos() {
    this.listFetching$.next(true);

    const items: ITodoItem[] = await getTodoService();

    this.getTodos$.next(items);
  }
  /**
   * @reducer
   */
  private handleGetTodos(items: ITodoItem[]): IStateMapper {
    return (state: ITodoState) => ({
      ...state,
      list: [...items],
      listFetching: false,
    });
  }
  /**
   * @reducer
   */
  private handleListFetching(fetching: boolean): IStateMapper {
    return (state: ITodoState) => ({
      ...state,
      listFetching: fetching,
    });
  }
  /**
   * @action
   */
  public addTodo(item: ITodoItem) {
    this.listFetching$.next(true);
    setTimeout(() => this.addTodo$.next(item), 500);
  }
  private handleAddTodo(item: ITodoItem): IStateMapper {
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
  private handleRemoveTodo(removingItemId: number): IStateMapper {
    return (state: ITodoState) => {
      const list: ITodoItem[] = state.list.filter((item: ITodoItem) => item.id !== removingItemId);

      return {
        ...state,
        list,
        listFetching: false,
      };
    };
  }
}
