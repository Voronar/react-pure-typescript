/**
 * Reaactive store utils
 */

import * as React from 'react';
import * as Rx from 'rxjs/Rx';

export type TStateMapper<StateType> = (state: StateType) => StateType;

interface IStoreMap<StateType = any> {
  [storeName: string]: (props: any) => IReactiveStore<StateType>;
}

export interface IReactiveStore<StateType> {
  getInitialState(): StateType;
  subscribe(next?: (value: StateType) => void): Rx.Subscription;
}

function reducer<StateType>(
  state: StateType,
  reduceFn: TStateMapper<StateType>,
): StateType {
  return reduceFn(state);
}

export function handleAction<SubjectType, StateType>(
  subject: Rx.Subject<SubjectType>,
  handler: (value: SubjectType) => TStateMapper<StateType>,
) {
  return subject.map<SubjectType, TStateMapper<StateType>>(handler);
}
/**
 * Reactive store util class
 */
export class ReactiveStore<StateType> {
  private getState$: Rx.Subject<void> = new Rx.Subject<void>();
  private store$: Rx.Observable<StateType>;

  constructor(
    private initialState: StateType,
  ) {}

  public subscribe(next?: (value: StateType) => void): Rx.Subscription {
    return this.store$
      .distinctUntilChanged() // Prevents the same value emitting
      .subscribe(next);
  }
  public rawSubscribe(next?: (value: StateType) => void): Rx.Subscription {
    return this.store$.subscribe(next);
  }
  public handleActions(...observables: Rx.Observable<any>[]): void {
    this.store$ = Rx.Observable
      .merge<TStateMapper<StateType>>(
        handleAction(this.getState$, () => (state: StateType) => state),
        ...observables,
      )
      .scan<TStateMapper<StateType>, StateType>(reducer, this.initialState)
      .share();
  }
  /**
   * Returns a last subscribed state value
   */
  public getState(): Promise<StateType> {
    return new Promise((resolve: (state: StateType) => Promise<StateType>) => {
      const subscribtion: Rx.Subscription = this.store$.subscribe((state: StateType) => {
        resolve(state);
        subscribtion.unsubscribe();
      });
      this.getState$.next();
    });
  }
}

/**
 * React component connector
 * @param observableStores Object with stores
 */
export function connect(observableStores: IStoreMap) {
  return (SourceComponent: any) => class HOC extends React.Component<any, any> {
    private subscriptions: Rx.Subscription[] = [];

    constructor(props: any) {
      super(props);

      this.state = {};

      Object.keys(observableStores).forEach((storeName: string) => {
        this.state = {
          ...this.state,
          [storeName]: observableStores[storeName](props).getInitialState(),
        };
      });
    }
    public componentDidMount() {
      Object.keys(observableStores).forEach((storeName: string) => {
        const subscription: Rx.Subscription = observableStores[storeName](this.props).subscribe((state: any) => {
          this.setState({
            [storeName]: state,
          });
        });
        this.subscriptions.push(subscription);
      });
    }
    public componentWillUnmount() {
      this.subscriptions.forEach((subs: Rx.Subscription) => subs.unsubscribe());
    }
    public render() {
      return (
        <SourceComponent
          {...this.state}
          {...this.props}
        />
      );
    }
  };
}
