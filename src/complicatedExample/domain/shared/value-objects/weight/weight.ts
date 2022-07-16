import { DomainError } from '../../errors/domainError';
import {
  UNKNOWN_WEIGHT_UNIT,
  WEIGHT_CANNOT_BE_NEGATIVE,
} from '../../errors/error-messages';
import * as E from 'fp-ts/Either';
import { Either, isLeft, left, right } from 'fp-ts/Either';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { invariants } from '../../utils/validation/invariants';

enum WeightUnitEnum {
  kg = 'kg',
}

export class Weight {
  private readonly weightInKilograms: number;

  constructor(weight: number, unit: WeightUnitEnum) {
    const canCreate = Weight.canCreate(weight, unit);

    if (isLeft(canCreate)) {
      throw new DomainError(canCreate.left.join('; '));
    }

    if (unit === 'kg') {
      this.weightInKilograms = weight;
    } else {
      throw new DomainError(UNKNOWN_WEIGHT_UNIT(unit));
    }
  }

  public static canCreate(
    weight: number,
    unit: WeightUnitEnum,
  ): E.Either<NonEmptyArray<string>, undefined> {
    return invariants(weightIsNotNegative(weight), weightUnitExists(unit));
  }
}

const weightIsNotNegative = (
  weight: number,
): Either<NonEmptyArray<string>, number> =>
  weight >= 0 ? right(weight) : left([WEIGHT_CANNOT_BE_NEGATIVE]);

const weightUnitExists = (
  unit: WeightUnitEnum,
): Either<NonEmptyArray<string>, WeightUnitEnum> =>
  Object.values(WeightUnitEnum).includes(unit)
    ? right(unit)
    : left([UNKNOWN_WEIGHT_UNIT(unit)]);
