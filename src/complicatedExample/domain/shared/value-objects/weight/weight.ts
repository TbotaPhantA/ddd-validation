import { DomainError } from '../../errors/domainError';
import { UNKNOWN_WEIGHT_UNIT } from './error-messages';
import * as E from 'fp-ts/Either';
import { isLeft } from 'fp-ts/Either';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { invariants } from '../../utils/validation/invariants';
import { weightIsNotNegative, weightUnitExists } from './invariants';
import { WeightUnitEnum } from './enums/weight-unit.enum';

export class Weight {
  private readonly weightInKilograms: number;

  constructor(weight: number, unit: WeightUnitEnum) {
    const canCreate = Weight.canCreate(weight, unit);

    if (isLeft(canCreate)) {
      throw new DomainError(canCreate.left.join('; '));
    }

    if (unit === WeightUnitEnum.KG) {
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
