import { WidthUnitEnum } from './width-unit.enum';
import { DomainError } from '../../../errors/domainError';
import { WIDTH_CANNOT_BE_NEGATIVE } from './error-messages';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { Either, isLeft } from 'fp-ts/Either';
import { invariants } from '../../../utils/validation/invariants';
import { widthIsNotNegative, widthUnitExists } from './invariants';

export class Width {
  private readonly widthInCentimeters: number;

  constructor(width: number, unit: WidthUnitEnum) {
    const canCreate = Width.canCreate(width, unit);

    if (isLeft(canCreate)) {
      throw new DomainError(canCreate.left.join('; '));
    }

    if (unit === WidthUnitEnum.CM) {
      this.widthInCentimeters = width;
    } else {
      throw new DomainError(WIDTH_CANNOT_BE_NEGATIVE);
    }
  }

  public static canCreate(
    width: number,
    unit: WidthUnitEnum,
  ): Either<NonEmptyArray<string>, undefined> {
    return invariants(widthIsNotNegative(width), widthUnitExists(unit));
  }
}
