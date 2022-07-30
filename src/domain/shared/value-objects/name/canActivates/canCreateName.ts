import { compose } from '@derbent-ninjas/invariant-composer';
import {
  nameDoesntContainSpecialSymbols,
  nameIsUnique,
  nameLengthIsNotIncreasingMax,
} from '../name-invariants';
import { Name } from '../name';

export const canCreateName = (
  ...params: ConstructorParameters<typeof Name>
) => {
  const { name } = params[0];
  const { isUnique } = params[1];

  return compose(
    nameIsUnique(isUnique),
    nameLengthIsNotIncreasingMax(name),
    nameDoesntContainSpecialSymbols(name),
  );
};
