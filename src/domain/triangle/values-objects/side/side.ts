import {
  assert,
  compose,
  Invariant,
  path,
} from '@derbent-ninjas/invariant-composer';
import {
  lengthIsNotIncreasingMaxValue,
  lengthIsNotNegative,
  sideMustBeUnique,
} from './invariants';
import { SideDto } from '../../../../application/triangle/dto/create-triangle-dto/side.dto';

export interface ExtraSideValidation {
  isSideLengthUnique: boolean;
}

export class Side {
  readonly length: number;

  constructor(dto: SideDto, validation: ExtraSideValidation) {
    assert('side', Side.canCreate(dto, validation));
    this.length = dto.length;
  }

  static canCreate(...params: ConstructorParameters<typeof Side>): Invariant {
    const [{ length }, { isSideLengthUnique }] = params;

    const canCreateLength = path(
      'length',
      compose(
        lengthIsNotNegative(length),
        lengthIsNotIncreasingMaxValue(length),
      ),
    );

    const canCreateSide = compose(sideMustBeUnique(isSideLengthUnique));
    return compose(canCreateLength, canCreateSide);
  }

  update(dto: SideDto, validation: ExtraSideValidation): void {
    assert('side', Side.canUpdate(dto, validation));
    Object.assign(this, dto);
  }

  static canUpdate(...params: Parameters<Side['update']>): Invariant {
    return this.canCreate(...params);
  }
}
