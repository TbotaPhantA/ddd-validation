// canCreate

import { Either, left, right } from 'fp-ts/Either';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { UNKNOWN_WIDTH_UNIT, WIDTH_CANNOT_BE_NEGATIVE } from './error-messages';
import { WidthUnitEnum } from './width-unit.enum';

export const widthIsNotNegative = (
  width: number,
): Either<NonEmptyArray<string>, number> =>
  width >= 0 ? right(width) : left([WIDTH_CANNOT_BE_NEGATIVE]);

export const widthUnitExists = (
  unit: WidthUnitEnum,
): Either<NonEmptyArray<string>, WidthUnitEnum> =>
  Object.values(WidthUnitEnum).includes(unit)
    ? right(unit)
    : left([UNKNOWN_WIDTH_UNIT(unit)]);
