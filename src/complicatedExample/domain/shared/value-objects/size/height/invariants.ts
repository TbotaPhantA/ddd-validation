// canCreate

import { Either, left, right } from 'fp-ts/Either';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { HeightUnitEnum } from './height-unit.enum';
import {
  HEIGHT_CANNOT_BE_NEGATIVE,
  UNKNOWN_HEIGHT_UNIT,
} from './error-messages';

export const heightIsNotNegative = (
  height: number,
): Either<NonEmptyArray<string>, number> =>
  height >= 0 ? right(height) : left([HEIGHT_CANNOT_BE_NEGATIVE]);

export const heightUnitExists = (
  unit: HeightUnitEnum,
): Either<NonEmptyArray<string>, HeightUnitEnum> =>
  Object.values(HeightUnitEnum).includes(unit)
    ? right(unit)
    : left([UNKNOWN_HEIGHT_UNIT(unit)]);
