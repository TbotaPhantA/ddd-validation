import { Either, isLeft } from 'fp-ts/Either';
import { DomainError } from '../../../errors/domainError';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { invariants } from '../../../utils/validation/invariants';
import { heightIsNotNegative, heightUnitExists } from './invariants';
import { HeightUnitEnum } from './height-unit.enum';
import { HEIGHT_CANNOT_BE_NEGATIVE } from './error-messages';

export class Height {
  readonly heightInCentimeters: number;

  constructor(height: number, unit: HeightUnitEnum) {
    const canCreate = Height.canCreate(height, unit);

    if (isLeft(canCreate)) {
      throw new DomainError(canCreate.left.join('; '));
    }

    if (unit === HeightUnitEnum.CM) {
      this.heightInCentimeters = height;
    } else {
      throw new DomainError(HEIGHT_CANNOT_BE_NEGATIVE);
    }
  }

  public static canCreate(
    height: number,
    unit: HeightUnitEnum,
  ): Either<NonEmptyArray<string>, undefined> {
    return invariants(heightIsNotNegative(height), heightUnitExists(unit));
  }
}
