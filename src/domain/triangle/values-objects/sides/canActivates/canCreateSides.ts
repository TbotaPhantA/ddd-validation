import { compose, Invariant, path } from '@derbent-ninjas/invariant-composer';
import { canCreateSide } from '../../../../shared/value-objects';
import { everySideDoesntIncreaseLengthOfTwoOtherSides } from '../invariants';
import { CreateSidesParams } from '../types';
import { ExtraSidesValidationParams } from '../types';

export const canCreateSides = (
  { sideA, sideB, sideC }: CreateSidesParams,
  { sideAData, sideBData, sideCData }: ExtraSidesValidationParams,
): Invariant => {
  const canCreateSideA = path('sideA', canCreateSide(sideA, sideAData));
  const canCreateSideB = path('sideB', canCreateSide(sideB, sideBData));
  const canCreateSideC = path('sideC', canCreateSide(sideC, sideCData));

  const canCreateAllSides = compose(
    everySideDoesntIncreaseLengthOfTwoOtherSides(sideA, sideB, sideC),
  );

  return compose(
    canCreateSideA,
    canCreateSideB,
    canCreateSideC,
    canCreateAllSides,
  );
};
