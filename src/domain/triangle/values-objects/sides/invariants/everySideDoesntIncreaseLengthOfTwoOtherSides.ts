import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { Side } from '../../side';

export const everySideDoesntIncreaseLengthOfTwoOtherSides = (
  sideA: Pick<Side, 'length'>,
  sideB: Pick<Side, 'length'>,
  sideC: Pick<Side, 'length'>,
): Invariant => {
  if (
    sideA.length < sideB.length + sideC.length &&
    sideB.length < sideA.length + sideC.length &&
    sideC.length < sideA.length + sideB.length
  ) {
    return success();
  } else {
    return fail({
      message: "every side shouldn't increase length of two other sides",
    });
  }
};
