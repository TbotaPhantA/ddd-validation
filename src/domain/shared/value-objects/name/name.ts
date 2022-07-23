import { compose, isFail, result } from '@derbent-ninjas/invariant-composer';
import {
  nameDoesntContainSpecialSymbols,
  nameIsUnique,
  nameLengthIsNotIncreasingMax,
} from './name-invariants';
import { Column } from 'typeorm';

export interface ExtraNameValidation {
  isUnique: boolean;
}

type CreateNameFields = Pick<Name, 'name'>;

export class Name {
  @Column()
  name: string;

  constructor(
    createNameParams: CreateNameFields,
    extraNameValidation: ExtraNameValidation,
  ) {
    const canCreate = Name.canCreate(createNameParams, extraNameValidation);

    if (isFail(canCreate)) {
      throw new Error(JSON.stringify(result(canCreate)));
    }

    this.name = createNameParams.name;
  }

  public static canCreate(
    { name }: CreateNameFields,
    { isUnique }: ExtraNameValidation,
  ) {
    return compose(
      nameIsUnique(isUnique),
      nameLengthIsNotIncreasingMax(name),
      nameDoesntContainSpecialSymbols(name),
    );
  }
}
