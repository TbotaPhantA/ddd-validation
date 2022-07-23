import { ExtraSideValidation, Side } from '../../shared/value-objects/side';
import {
  Invariant,
  compose,
  isFail,
  result,
  path,
} from '@derbent-ninjas/invariant-composer';
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
    const canCreate = path(
      'sides',
      Sides.canCreate(params, extraValidationData),
    );

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
    const sideAInvariant = path('sideA', Side.canCreate(sideA, sideAData));
    const sideBInvariant = path('sideB', Side.canCreate(sideB, sideBData));
    const sideCInvariant = path('sideC', Side.canCreate(sideC, sideCData));

    const allSidesInvariant = compose(
      everySideDoesntIncreaseLengthOfTwoOtherSides(sideA, sideB, sideC),
    );

    return compose(
      sideAInvariant,
      sideBInvariant,
      sideCInvariant,
      allSidesInvariant,
    );
  }
}
