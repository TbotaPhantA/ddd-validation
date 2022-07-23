import {
  ExtraSideValidation,
  Side,
} from '../../shared/value-objects/side/side';
import { Invariant, compose, path } from '@derbent-ninjas/invariant-composer';
import { everySideDoesntIncreaseLengthOfTwoOtherSides } from './invariants';
import { assertCanCreate } from '../../shared/errors/assertCanCreate';

export interface ExtraSidesValidation {
  sideAData: ExtraSideValidation;
  sideBData: ExtraSideValidation;
  sideCData: ExtraSideValidation;
}

type CreateSidesParams = Pick<Sides, 'sideA' | 'sideB' | 'sideC'>;

export class Sides {
  readonly sideA: Side;
  readonly sideB: Side;
  readonly sideC: Side;

  constructor(
    params: CreateSidesParams,
    extraValidationData: ExtraSidesValidation,
  ) {
    const canCreate = Sides.canCreate(params, extraValidationData);
    assertCanCreate('sides', canCreate);

    this.sideA = params.sideA;
    this.sideB = params.sideB;
    this.sideC = params.sideC;
  }

  public static canCreate(
    { sideA, sideB, sideC }: CreateSidesParams,
    { sideAData, sideBData, sideCData }: ExtraSidesValidation,
  ): Invariant {
    const canCreateSideA = path('sideA', Side.canCreate(sideA, sideAData));
    const canCreateSideB = path('sideB', Side.canCreate(sideB, sideBData));
    const canCreateSideC = path('sideC', Side.canCreate(sideC, sideCData));

    const canCreateAllSides = compose(
      everySideDoesntIncreaseLengthOfTwoOtherSides(sideA, sideB, sideC),
    );

    return compose(
      canCreateSideA,
      canCreateSideB,
      canCreateSideC,
      canCreateAllSides,
    );
  }
}
