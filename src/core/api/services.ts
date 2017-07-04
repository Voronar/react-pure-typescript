/**
 * Services
 */

export interface ITodoItem {
  id: number;
  title: string;
  description?: string;
}

export function first(): Promise<ITodoItem[]> {
  return new Promise<ITodoItem[]>((resolve: (value: ITodoItem[]) => Promise<ITodoItem[]>) =>
    setTimeout(() => resolve([
      {
        id: 1,
        title: 'buy eggs',
        description: 'chicken eggs',
      },
    ]), 1000));
}
export function second(): Promise<ITodoItem[]> {
  return new Promise<ITodoItem[]>((resolve: (value: ITodoItem[]) => Promise<ITodoItem[]>) =>
    setTimeout(() => resolve([
      {
        id: 1,
        title: 'buy cheese',
        description: 'hard cheese',
      },
    ]), 1000));
}
