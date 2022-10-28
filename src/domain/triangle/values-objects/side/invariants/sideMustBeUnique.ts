import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import {
  NOT_ENOUGH_DATA_FOR_SIDE_CREATION,
  SIDE_MUST_BE_UNIQUE,
} from '../error-messages';

export const sideMustBeUnique = (isUnique?: boolean): Invariant => {
  if (isUnique === undefined) {
    return fail({ message: NOT_ENOUGH_DATA_FOR_SIDE_CREATION });
  }

  return isUnique ? success() : fail({ message: SIDE_MUST_BE_UNIQUE });
};
