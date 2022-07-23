import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';
import {
  NAME_IS_NOT_UNIQUE,
  NAME_LENGTH_CANNOT_INCREASE_MAX,
  NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS,
} from './error-messages';

export const nameIsUnique = (isNameUnique: boolean): Invariant => {
  return isNameUnique ? success() : fail({ message: NAME_IS_NOT_UNIQUE });
};

export const nameLengthIsNotIncreasingMax = (name: string) => {
  const maxLength = 32;
  return name.length <= maxLength
    ? success()
    : fail({
        message: NAME_LENGTH_CANNOT_INCREASE_MAX(maxLength, name.length),
      });
};

export const doesntContainSpecialSymbols = (name: string) => {
  const specialSymbols = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  if (!name.match(specialSymbols)) {
    return success();
  } else {
    return fail({ message: NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS });
  }
};
