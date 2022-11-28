import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { LENGTH_MUST_NOT_BE_NEGATIVE } from './error-messages';

export const lengthIsNotNegative = (length: number): Invariant => {
  return length < 0
    ? fail({ message: LENGTH_MUST_NOT_BE_NEGATIVE })
    : success();
};
