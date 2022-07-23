import { fail, success } from '@derbent-ninjas/invariant-composer';
import { NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS } from '../error-messages';

export const nameDoesntContainSpecialSymbols = (name: string) => {
  const specialSymbols = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  if (!name.match(specialSymbols)) {
    return success();
  } else {
    return fail({ message: NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS });
  }
};
