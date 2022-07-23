import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';

export const lengthIsNotNegative = (length: number): Invariant => {
  return length < 0
    ? fail({ message: 'length must be zero or positive' })
    : success();
};

export const lengthIsNotIncreasingMaxValue = (length: number): Invariant => {
  const maxValue = 1000000;
  return length > maxValue
    ? fail({
        message: `length should not increase maximum of ${maxValue}`,
      })
    : success();
};

export const sideMustBeUnique = (isUnique: boolean): Invariant => {
  return isUnique ? success() : fail({ message: 'side must be unique' });
};
