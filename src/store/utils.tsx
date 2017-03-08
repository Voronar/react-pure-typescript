/**
 * HOC
 */

import * as React from 'react';
import * as Rx from 'rxjs/Rx';

export interface IStore<IState> {
  getInitialState(): IState;
  subscribe(next?: (value: IState) => void): Rx.Subscription;
}

export function reducer<IStateType>(
  state: IStateType,
  reduceFn: (state: IStateType) => IStateType,
): IStateType {
  return reduceFn(state);
}

interface IStoreMap<IState = any> {
  [storeName: string]: IStore<IState>;
}

export function connect(observableStores: IStoreMap ) {
  return (SourceComponent: any) => class HOC extends React.Component<any, any> {
    private subscriptions: Rx.Subscription[] = [];

    constructor() {
      super();

      this.state = {};

      Object.keys(observableStores).forEach((storeName: string) => {
        this.state = {
          ...this.state,
          [storeName]: observableStores[storeName].getInitialState(),
        };
      });
    }
    public componentDidMount() {
      Object.keys(observableStores).forEach((storeName: string) => {
        const subscription: Rx.Subscription = observableStores[storeName].subscribe((state: any) => {
          this.setState({
            [storeName]: { ...state },
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
