import { compose, path } from '@derbent-ninjas/invariant-composer';
import {
  lengthIsNotIncreasingMaxValue,
  lengthIsNotNegative,
  sideMustBeUnique,
} from './invariants';
import { assertCanCreate } from '../../errors/assertCanCreate';
import { Column } from 'typeorm';

export interface ExtraSideValidation {
  isUnique: boolean;
}

type CreateSideParams = Pick<Side, 'length'>;

export class Side {
  @Column()
  readonly length: number;

  constructor(
    params: CreateSideParams,
    extraValidationData: ExtraSideValidation,
  ) {
    const canCreate = Side.canCreate(params, extraValidationData);
    assertCanCreate('side', canCreate);

    this.length = params.length;
  }

  public static canCreate(
    { length }: CreateSideParams,
    { isUnique }: ExtraSideValidation,
  ) {
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
}
