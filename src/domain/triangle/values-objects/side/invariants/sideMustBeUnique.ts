import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { SIDE_MUST_BE_UNIQUE } from './error-messages';

export const sideMustBeUnique = (isUnique: boolean): Invariant => {
  return isUnique ? success() : fail({ message: SIDE_MUST_BE_UNIQUE });
};
