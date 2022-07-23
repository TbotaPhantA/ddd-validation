import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { NAME_IS_NOT_UNIQUE } from '../error-messages';

export const nameIsUnique = (isNameUnique: boolean): Invariant => {
  return isNameUnique ? success() : fail({ message: NAME_IS_NOT_UNIQUE });
};
