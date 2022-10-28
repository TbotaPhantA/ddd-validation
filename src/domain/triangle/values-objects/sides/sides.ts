import {
  assert,
  compose,
  Invariant,
  path,
} from '@derbent-ninjas/invariant-composer';
import { CreateSidesProps } from './types';
import { ExtraSidesValidationParams } from './types';
import { everySideDoesntIncreaseLengthOfTwoOtherSides } from './invariants';
import { DeepPartial } from '../../../shared/types/deepPartial';
import { Side } from '../side';

export class Sides {
  readonly sideA: Side;
  readonly sideB: Side;
  readonly sideC: Side;
  // TODO: cover with tests

  constructor(props: CreateSidesProps, validation: ExtraSidesValidationParams) {
    assert('sides', Sides.canCreate(props, validation));
    this.sideA = new Side(props.sideA, validation.sideAValidation);
    this.sideB = new Side(props.sideB, validation.sideBValidation);
    this.sideC = new Side(props.sideC, validation.sideCValidation);
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof Sides>
  ): Invariant {
    const { sideA, sideB, sideC } = params[0];
    const { sideAValidation, sideBValidation, sideCValidation } = params[1];

    const canCreateSideA = path(
      'sideA',
      Side.canCreate(sideA, sideAValidation),
    );
    const canCreateSideB = path(
      'sideB',
      Side.canCreate(sideB, sideBValidation),
    );
    const canCreateSideC = path(
      'sideC',
      Side.canCreate(sideC, sideCValidation),
    );

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

    this.sideA.update(props.sideA, validation.sideAValidation);
    this.sideB.update(props.sideB, validation.sideBValidation);
    this.sideC.update(props.sideC, validation.sideCValidation);
  }

  public canUpdate(...args: Parameters<Sides['update']>): Invariant {
    const { sideA, sideB, sideC } = args[0];
    const { sideAValidation, sideBValidation, sideCValidation } = args[1];

    const canUpdateSideA = path(
      'sideA',
      Side.canUpdate(sideA, sideAValidation),
    );
    const canUpdateSideB = path(
      'sideB',
      Side.canUpdate(sideB, sideBValidation),
    );
    const canUpdateSideC = path(
      'sideC',
      Side.canUpdate(sideC, sideCValidation),
    );

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
