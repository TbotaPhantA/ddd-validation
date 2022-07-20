import { Side } from '../../shared/value-objects/side';
import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';

export const everySideDoesntIncreaseLengthOfTwoOtherSides = (
  sideA: Side,
  sideB: Side,
  sideC: Side,
): Invariant => {
  if (
    sideA.length < sideB.length + sideC.length &&
    sideB.length < sideA.length + sideC.length &&
    sideC.length < sideA.length + sideB.length
  ) {
    return success();
  } else {
    return fail({
      message: 'every side shouldnt increase length of two other sides',
    });
  }
};
