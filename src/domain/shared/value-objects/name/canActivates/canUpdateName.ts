import { Name } from '../name';
import { compose, ifExists } from '@derbent-ninjas/invariant-composer';
import {
  nameDoesntContainSpecialSymbols,
  nameIsUnique,
  nameLengthIsNotIncreasingMax,
} from '../name-invariants';

export const canUpdateName = (...params: Parameters<Name['update']>) => {
  const { name } = params[0];
  const { isUnique } = params[1];

  return compose(
    nameIsUnique(isUnique),
    ifExists(name, nameLengthIsNotIncreasingMax),
    ifExists(name, nameDoesntContainSpecialSymbols),
  );
};
