import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import {
  NAME_IS_NOT_UNIQUE,
  NOT_ENOUGH_EXTRA_VALIDATION_PARAMS,
} from '../error-messages';

export const nameIsUnique = (isNameUnique?: boolean): Invariant => {
  if (isNameUnique === undefined)
    return fail({ message: NOT_ENOUGH_EXTRA_VALIDATION_PARAMS });

  return isNameUnique ? success() : fail({ message: NAME_IS_NOT_UNIQUE });
};
