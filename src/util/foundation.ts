import { AssertionError } from "assert";

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value != null;

export function assert(
  condition: boolean,
  message?: string
): asserts condition {
  if (!condition) {
    throw new AssertionError({ message });
  }
}
