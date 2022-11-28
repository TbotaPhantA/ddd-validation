import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS } from './error-messages';

export const nameDoesntContainSpecialSymbols = (name: string): Invariant => {
  const specialSymbols = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  if (name.split('').every((char) => !char.match(specialSymbols))) {
    return success();
  } else {
    return fail({ message: NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS });
  }
};
