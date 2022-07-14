import { DomainError } from '../errors/domainError';
import {
  UNKNOWN_WEIGHT_UNIT,
  WEIGHT_CANNOT_BE_NEGATIVE,
} from '../errors/error-messages';
import * as E from 'fp-ts/Either';
import { isLeft } from 'fp-ts/Either';

export type WeightUnit = 'kg';

export class Weight {
  private readonly weightInKilograms: number;

  constructor(weight: number, unit: WeightUnit) {
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
    unit: WeightUnit,
  ): E.Either<string[], undefined> {
    const errors: string[] = [];

    if (weight < 0) {
      errors.push(WEIGHT_CANNOT_BE_NEGATIVE);
    }

    if (unit !== 'kg') {
      errors.push(UNKNOWN_WEIGHT_UNIT(unit));
    }

    if (errors.length > 0) {
      return E.left(errors);
    }

    return E.right(undefined);
  }

  get kilograms() {
    return this.weightInKilograms;
  }
}
