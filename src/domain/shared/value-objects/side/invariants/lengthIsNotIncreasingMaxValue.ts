import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';

export const lengthIsNotIncreasingMaxValue = (length: number): Invariant => {
  const maxValue = 1000000;
  return length > maxValue
    ? fail({
        message: `length should not increase maximum of ${maxValue}`,
      })
    : success();
};
