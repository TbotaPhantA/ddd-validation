import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';

export const lengthIsNotNegative = (length: number): Invariant => {
  return length < 0
    ? fail({ message: 'length must be zero or positive' })
    : success();
};
