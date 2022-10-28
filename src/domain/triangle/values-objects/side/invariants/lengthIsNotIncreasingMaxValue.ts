import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { LENGTH_MUST_NOT_INCREASE_MAXIMUM } from '../error-messages';

export const lengthIsNotIncreasingMaxValue = (length: number): Invariant => {
  const maxValue = 100;
  return length > maxValue
    ? fail({ message: LENGTH_MUST_NOT_INCREASE_MAXIMUM })
    : success();
};
