import { CreateSideParams, ExtraSideValidationParams } from '../types';
import { compose, path } from '@derbent-ninjas/invariant-composer';
import {
  lengthIsNotIncreasingMaxValue,
  lengthIsNotNegative,
  sideMustBeUnique,
} from '../invariants';

export const canCreateSide = (
  { length }: CreateSideParams,
  { isUnique }: ExtraSideValidationParams,
) => {
  const canCreateLength = path(
    'length',
    compose(lengthIsNotNegative(length), lengthIsNotIncreasingMaxValue(length)),
  );

  const canCreateSide = compose(sideMustBeUnique(isUnique));

  return compose(canCreateLength, canCreateSide);
};
