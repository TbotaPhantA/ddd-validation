import {
  assert,
  compose,
  ifExists,
  Invariant,
  path,
  success,
} from '@derbent-ninjas/invariant-composer';
import { Column } from 'typeorm';
import { CreateSideProps, ExtraSideValidationParams } from './types';
import {
  lengthIsNotIncreasingMaxValue,
  lengthIsNotNegative,
  sideMustBeUnique,
} from './invariants';
import { DeepPartial } from '../../../shared/types/deepPartial';

export class Side {
  @Column()
  readonly length: number;

  constructor(
    props: CreateSideProps,
    extraValidationData: ExtraSideValidationParams,
  ) {
    assert('side', Side.canCreate(props, extraValidationData));
    this.length = props.length;
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof Side>
  ): Invariant {
    const { length } = params[0];
    const { isUnique } = params[1];
    const canCreateLength = path(
      'length',
      compose(
        lengthIsNotNegative(length),
        lengthIsNotIncreasingMaxValue(length),
      ),
    );

    const canCreateSide = compose(sideMustBeUnique(isUnique));
    return compose(canCreateLength, canCreateSide);
  }

  public update(
    props: DeepPartial<CreateSideProps>,
    extraValidationData: DeepPartial<ExtraSideValidationParams>,
  ): void {
    assert('side', Side.canUpdate(props, extraValidationData));
    Object.assign(this, props);
  }

  public static canUpdate(
    ...[props, validation]: Parameters<Side['update']>
  ): Invariant {
    const length = props.length;
    const isUnique = validation.isUnique;

    const canUpdateLength = path(
      'length',
      compose(
        ifExists(length, lengthIsNotNegative),
        ifExists(length, lengthIsNotIncreasingMaxValue),
      ),
    );

    const canUpdateSide = length ? sideMustBeUnique(isUnique) : success();
    return compose(canUpdateLength, canUpdateSide);
  }
}
