import { Side } from '../../../shared/value-objects';
import {
  assert,
  compose,
  Invariant,
  path,
  success,
} from '@derbent-ninjas/invariant-composer';
import { Column } from 'typeorm';
import { CreateSidesParams, UpdateSidesParams } from './types';
import { canCreateSides } from './canActivates';
import { ExtraSidesValidationParams } from './types';
import { canUpdateSide } from '../../../shared/value-objects';
import { everySideDoesntIncreaseLengthOfTwoOtherSides } from './invariants';

export class Sides {
  @Column(() => Side)
  readonly sideA: Side;

  @Column(() => Side)
  readonly sideB: Side;

  @Column(() => Side)
  readonly sideC: Side;

  constructor(
    params: CreateSidesParams,
    extraValidationData: ExtraSidesValidationParams,
  ) {
    const canCreate = canCreateSides(params, extraValidationData);
    assert('sides', canCreate);

    Object.assign(this, params);
  }

  public update(
    params: UpdateSidesParams,
    extraSidesValidationParams: ExtraSidesValidationParams,
  ): void {
    const canUpdate = this.canUpdate(params, extraSidesValidationParams);
    assert('sides', canUpdate);

    this.sideA.update(params.sideA, extraSidesValidationParams.sideAData);
    this.sideB.update(params.sideB, extraSidesValidationParams.sideBData);
    this.sideC.update(params.sideC, extraSidesValidationParams.sideCData);
  }

  public canUpdate(
    { sideA, sideB, sideC }: UpdateSidesParams,
    { sideAData, sideBData, sideCData }: ExtraSidesValidationParams,
  ): Invariant {
    const canUpdateSideA = path(
      'sideA',
      sideA ? canUpdateSide(sideA, sideAData) : success(),
    );
    const canUpdateSideB = path(
      'sideB',
      sideB ? canUpdateSide(sideB, sideBData) : success(),
    );
    const canUpdateSideC = path(
      'sideC',
      sideC ? canUpdateSide(sideC, sideCData) : success(),
    );

    const canUpdateSides = everySideDoesntIncreaseLengthOfTwoOtherSides(
      { ...this.sideA, ...sideA },
      { ...this.sideB, ...sideB },
      { ...this.sideC, ...sideC },
    );

    return compose(
      canUpdateSideA,
      canUpdateSideB,
      canUpdateSideC,
      canUpdateSides,
    );
  }
}
