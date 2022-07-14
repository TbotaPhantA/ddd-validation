import { DomainError } from '../errors/domainError';
import {
  UNKNOWN_WEIGHT_UNIT,
  WEIGHT_CANNOT_BE_NEGATIVE,
} from '../errors/error-messages';
import { assert } from '../utils/assert';

export type WeightUnit = 'kg';

export class Weight {
  private readonly weightInKilograms: number;

  constructor(weight: number, unit: WeightUnit) {
    assert(weight >= 0, WEIGHT_CANNOT_BE_NEGATIVE);

    if (unit === 'kg') {
      this.weightInKilograms = weight;
    } else {
      throw new DomainError(UNKNOWN_WEIGHT_UNIT(unit));
    }
  }

  get kilograms() {
    return this.weightInKilograms;
  }
}
