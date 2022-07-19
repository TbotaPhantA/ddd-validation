import { ExtraSideValidation, Side } from '../../shared/value-objects/side';
import {
  Invariant,
  invariants,
  isFail,
  result,
} from '@derbent-ninjas/invariant-composer/src';
import { everySideDoesntIncreaseLengthOfTwoOtherSides } from './invariants';

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

    if (isFail(canCreate)) {
      throw new Error(JSON.stringify(result(canCreate)));
    }

    this.sideA = params.sideA;
    this.sideB = params.sideB;
    this.sideC = params.sideC;
  }

  public static canCreate(
    { sideA, sideB, sideC }: CreateSidesParams,
    { sideAData, sideBData, sideCData }: ExtraSidesValidation,
  ): Invariant {
    const sideAInvariant = Side.canCreate(sideA, sideAData).path('sideA');
    const sideBInvariant = Side.canCreate(sideB, sideBData).path('sideB');
    const sideCInvariant = Side.canCreate(sideC, sideCData).path('sideC');

    const allSidesInvariant = invariants(
      everySideDoesntIncreaseLengthOfTwoOtherSides(sideA, sideB, sideC),
    );

    return invariants(
      sideAInvariant,
      sideBInvariant,
      sideCInvariant,
      allSidesInvariant,
    );
  }
}
