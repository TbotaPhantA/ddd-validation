import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';

export const nameIsUnique = (isNameUnique: boolean): Invariant => {
  return isNameUnique ? success() : fail({ message: 'name must be unique' });
};

export const nameLengthIsNotIncreasingMax = (name: string) => {
  const maxLength = 32;
  return name.length <= maxLength
    ? success()
    : fail({ message: `name max length is ${maxLength}` });
};

export const doesntContainSpecialSymbols = (name: string) => {
  const specialSymbols = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  if (!name.match(specialSymbols)) {
    return success();
  } else {
    return fail({ message: 'name must not contain special symbols' });
  }
};
