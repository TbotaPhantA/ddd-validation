// canCreate

import { Either, left, right } from 'fp-ts/Either';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { WIDTH_CANNOT_BE_NEGATIVE } from './error-messages';

export const widthIsNotNegative = (
  width: number,
): Either<NonEmptyArray<string>, number> =>
  width >= 0 ? right(width) : left([WIDTH_CANNOT_BE_NEGATIVE]);

// export const weightUnitExists = (
//   unit: WeightUnitEnum,
// ): Either<NonEmptyArray<string>, WeightUnitEnum> =>
//   Object.values(WeightUnitEnum).includes(unit)
//     ? right(unit)
//     : left([UNKNOWN_WEIGHT_UNIT(unit)]);
