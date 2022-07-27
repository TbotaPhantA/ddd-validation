import { compose } from '@derbent-ninjas/invariant-composer';
import {
  nameDoesntContainSpecialSymbols,
  nameIsUnique,
  nameLengthIsNotIncreasingMax,
} from './name-invariants';
import { Column } from 'typeorm';
import { assertCanCreate } from '../../errors/assertCanCreate';
import { CreateNameFields } from './types/createNameFields';
import { ExtraNameValidationParams } from './types/extraNameValidationParams';

export class Name {
  @Column()
  name: string;

  constructor(
    createNameParams: CreateNameFields,
    extraNameValidation: ExtraNameValidationParams,
  ) {
    const canCreate = Name.canCreate(createNameParams, extraNameValidation);
    assertCanCreate('name', canCreate);

    Object.assign(this, createNameParams);
  }

  public static canCreate(
    { name }: CreateNameFields,
    { isUnique }: ExtraNameValidationParams,
  ) {
    return compose(
      nameIsUnique(isUnique),
      nameLengthIsNotIncreasingMax(name),
      nameDoesntContainSpecialSymbols(name),
    );
  }
}
