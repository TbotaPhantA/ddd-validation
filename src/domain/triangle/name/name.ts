import { compose, isFail, result } from '@derbent-ninjas/invariant-composer';
import {
  doesntContainSpecialSymbols,
  nameIsUnique,
  nameLengthIsNotIncreasingMax,
} from './invariants';

export interface ExtraNameValidation {
  isUnique: boolean;
}

type CreateNameParams = Pick<Name, 'name'>;

export class Name {
  name: string;

  constructor(
    createNameParams: CreateNameParams,
    extraNameValidation: ExtraNameValidation,
  ) {
    const canCreate = Name.canCreate(createNameParams, extraNameValidation);

    if (isFail(canCreate)) {
      throw new Error(JSON.stringify(result(canCreate)));
    }

    this.name = createNameParams.name;
  }

  public static canCreate(
    { name }: CreateNameParams,
    { isUnique }: ExtraNameValidation,
  ) {
    return compose(
      nameIsUnique(isUnique),
      nameLengthIsNotIncreasingMax(name),
      doesntContainSpecialSymbols(name),
    );
  }
}
