import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';

export const sideMustBeUnique = (isUnique: boolean): Invariant => {
  return isUnique ? success() : fail({ message: 'side must be unique' });
};
