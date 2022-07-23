import {
  compose,
  isFail,
  path,
  result,
} from '@derbent-ninjas/invariant-composer';
import {
  lengthIsNotIncreasingMaxValue,
  lengthIsNotNegative,
  sideMustBeUnique,
} from './invariants';

export interface ExtraSideValidation {
  isUnique: boolean;
}

type CreateSideParams = Pick<Side, 'length'>;

export class Side {
  readonly length: number;

  constructor(
    params: CreateSideParams,
    extraValidationData: ExtraSideValidation,
  ) {
    const canCreate = Side.canCreate(params, extraValidationData);

    if (isFail(canCreate)) {
      throw new Error(JSON.stringify(result(canCreate)));
    }

    this.length = params.length;
  }

  public static canCreate(
    { length }: CreateSideParams,
    { isUnique }: ExtraSideValidation,
  ) {
    const lengthInvariant = path(
      'length',
      compose(
        lengthIsNotNegative(length),
        lengthIsNotIncreasingMaxValue(length),
      ),
    );

    const sideInvariant = compose(sideMustBeUnique(isUnique));

    return compose(lengthInvariant, sideInvariant);
  }
}
