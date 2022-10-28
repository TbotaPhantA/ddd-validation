import {
  assert,
  compose,
  Invariant,
  path,
} from '@derbent-ninjas/invariant-composer';
import { Column } from 'typeorm';
import { CreateSidesProps } from './types';
import { ExtraSidesValidationParams } from './types';
import { everySideDoesntIncreaseLengthOfTwoOtherSides } from './invariants';
import { DeepPartial } from '../../../shared/types/deepPartial';
import { Side } from '../side';

export class Sides {
  @Column(() => Side)
  readonly sideA: Side;

  @Column(() => Side)
  readonly sideB: Side;

  @Column(() => Side)
  readonly sideC: Side;
  // TODO: cover with tests

  constructor(props: CreateSidesProps, validation: ExtraSidesValidationParams) {
    assert('sides', Sides.canCreate(props, validation));
    this.sideA = new Side(props.sideA, validation.sideAData);
    this.sideB = new Side(props.sideB, validation.sideBData);
    this.sideC = new Side(props.sideC, validation.sideCData);
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof Sides>
  ): Invariant {
    const { sideA, sideB, sideC } = params[0];
    const { sideAData, sideBData, sideCData } = params[1];

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

  public update(
    props: DeepPartial<CreateSidesProps>,
    validation: DeepPartial<ExtraSidesValidationParams>,
  ): void {
    assert('sides', this.canUpdate(props, validation));

    this.sideA.update(props.sideA, validation.sideAData);
    this.sideB.update(props.sideB, validation.sideBData);
    this.sideC.update(props.sideC, validation.sideCData);
  }

  public canUpdate(...args: Parameters<Sides['update']>): Invariant {
    const { sideA, sideB, sideC } = args[0];
    const { sideAData, sideBData, sideCData } = args[1];

    const canUpdateSideA = path('sideA', Side.canUpdate(sideA, sideAData));
    const canUpdateSideB = path('sideB', Side.canUpdate(sideB, sideBData));
    const canUpdateSideC = path('sideC', Side.canUpdate(sideC, sideCData));

    const newSideA = { ...this.sideA, ...sideA };
    const newSideB = { ...this.sideB, ...sideB };
    const newSideC = { ...this.sideC, ...sideC };
    const canUpdateSides = everySideDoesntIncreaseLengthOfTwoOtherSides(
      newSideA,
      newSideB,
      newSideC,
    );

    return compose(
      canUpdateSideA,
      canUpdateSideB,
      canUpdateSideC,
      canUpdateSides,
    );
  }
}
