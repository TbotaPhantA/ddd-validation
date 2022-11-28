import {
  assert,
  compose,
  Invariant,
  path,
} from '@derbent-ninjas/invariant-composer';
import { everySideDoesntIncreaseLengthOfTwoOtherSides } from './invariants';
import { ExtraSideValidation, Side } from '../side';
import { SidesDto } from '../../../../application/triangle/dto/create-triangle-dto/sides.dto';

export interface ExtraSidesValidation {
  sideAValidation: ExtraSideValidation;
  sideBValidation: ExtraSideValidation;
  sideCValidation: ExtraSideValidation;
}

export class Sides {
  readonly sideA: Side;
  readonly sideB: Side;
  readonly sideC: Side;
  // TODO: cover with tests

  constructor(dto: SidesDto, validation: ExtraSidesValidation) {
    assert('sides', Sides.canCreate(dto, validation));
    this.sideA = new Side(dto.sideA, validation.sideAValidation);
    this.sideB = new Side(dto.sideB, validation.sideBValidation);
    this.sideC = new Side(dto.sideC, validation.sideCValidation);
  }

  static canCreate(...params: ConstructorParameters<typeof Sides>): Invariant {
    const [
      { sideA, sideB, sideC },
      { sideAValidation, sideBValidation, sideCValidation },
    ] = params;

    const sideAInv = path('sideA', Side.canCreate(sideA, sideAValidation));
    const sideBInv = path('sideB', Side.canCreate(sideB, sideBValidation));
    const sideCInv = path('sideC', Side.canCreate(sideC, sideCValidation));

    const canCreateAllSides = everySideDoesntIncreaseLengthOfTwoOtherSides(
      sideA,
      sideB,
      sideC,
    );

    return compose(sideAInv, sideBInv, sideCInv, canCreateAllSides);
  }

  update(dto: SidesDto, validation: ExtraSidesValidation): void {
    assert('sides', this.canUpdate(dto, validation));
    this.sideA.update(dto.sideA, validation.sideAValidation);
    this.sideB.update(dto.sideB, validation.sideBValidation);
    this.sideC.update(dto.sideC, validation.sideCValidation);
  }

  canUpdate(...args: Parameters<Sides['update']>): Invariant {
    return Sides.canCreate(...args);
  }
}
