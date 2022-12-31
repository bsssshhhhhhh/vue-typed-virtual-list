export type ScrollerArray<T> = (T | undefined)[];
export type ItemContext<T> = {
  index: number;
  offset: number;
  ref: T | undefined;
}
