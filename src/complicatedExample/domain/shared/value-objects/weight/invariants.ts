import { Either, left, right } from 'fp-ts/Either';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import {
  UNKNOWN_WEIGHT_UNIT,
  WEIGHT_CANNOT_BE_NEGATIVE,
} from './error-messages';
import { WeightUnitEnum } from './enums/weight-unit.enum';

export const weightIsNotNegative = (
  weight: number,
): Either<NonEmptyArray<string>, number> =>
  weight >= 0 ? right(weight) : left([WEIGHT_CANNOT_BE_NEGATIVE]);

export const weightUnitExists = (
  unit: WeightUnitEnum,
): Either<NonEmptyArray<string>, WeightUnitEnum> =>
  Object.values(WeightUnitEnum).includes(unit)
    ? right(unit)
    : left([UNKNOWN_WEIGHT_UNIT(unit)]);
