type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift';

export type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<
  TObj,
  Exclude<keyof TObj, ArrayLengthMutationKeys>
> & {
  readonly length: L;
  [I: number]: T;
  [Symbol.iterator]: () => IterableIterator<T>;
};

/*
export class FixedLengthArray<T, L> extends Array<T> {
  constructor(...args: T[]);
  constructor(arrayLength: number);
  constructor(...args: T[]) {
    super(...args);
    this.length;
  }
  update(index: number, data: T): void {
    this[index] = data;
  }
  expand(length: number) {
    this.length = length;
  }
  contract(length: number) {
    if (length > this.length) throw new RangeError('Invalid array length');
    this.length -= length;
  }
  splice(start: number, deleteCount?: number | undefined): T[];
  splice(start: number, deleteCount: number, ...items: T[]): T[];
  splice(start: unknown, deleteCount?: unknown, ...rest: unknown[]): T[] {
    throw new Error("This object's length is not mutable.");
  }
  push(...items: T[]): number {
    throw new Error("This object's length is not mutable.");
  }
  pop(): T | undefined {
    throw new Error("This object's length is not mutable.");
  }
  shift(): T | undefined {
    throw new Error("This object's length is not mutable.");
  }
  unshift(...items: T[]): number {
    throw new Error("This object's length is not mutable.");
  }
}
*/
