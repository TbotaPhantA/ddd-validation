import { UpdateSideParams, ExtraSideValidationParams } from '../types';
import { compose, ifExists, path } from '@derbent-ninjas/invariant-composer';
import {
  lengthIsNotIncreasingMaxValue,
  lengthIsNotNegative,
  sideMustBeUnique,
} from '../invariants';

export const canUpdateSide = (
  params: UpdateSideParams,
  extraSideValidationParams: ExtraSideValidationParams,
) => {
  const { length } = params;

  const canUpdateLength = path(
    'length',
    compose(
      ifExists(length, lengthIsNotNegative),
      ifExists(length, lengthIsNotIncreasingMaxValue),
    ),
  );

  const canUpdateSide = compose(
    sideMustBeUnique(extraSideValidationParams.isUnique),
  );

  return compose(canUpdateLength, canUpdateSide);
};
