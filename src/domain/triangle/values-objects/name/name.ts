import { Column } from 'typeorm';
import { CreateNameProps, ExtraCreateNameValidationParams } from './types';
import { assert, compose, success } from '@derbent-ninjas/invariant-composer';
import {
  nameDoesntContainSpecialSymbols,
  nameIsUnique,
  nameLengthIsNotIncreasingMax,
} from './name-invariants';
import { DeepPartial } from '../../../shared/types/deepPartial';

export class Name {
  @Column()
  readonly name: string;

  constructor(
    props: CreateNameProps,
    extraInvariantsData: ExtraCreateNameValidationParams,
  ) {
    assert('name', Name.canCreate(props, extraInvariantsData));
    this.name = props.name;
  }

  public static canCreate(...params: ConstructorParameters<typeof Name>) {
    const { name } = params[0];
    const { isUnique } = params[1];

    return compose(
      nameIsUnique(isUnique),
      nameLengthIsNotIncreasingMax(name),
      nameDoesntContainSpecialSymbols(name),
    );
  }

  public update(
    props: DeepPartial<CreateNameProps>,
    validation: DeepPartial<ExtraCreateNameValidationParams>,
  ): void {
    assert('name', Name.canUpdate(props, validation));
    Object.assign(this, props);
  }

  public static canUpdate(...params: Parameters<Name['update']>) {
    const { name } = params[0];
    const { isUnique } = params[1];

    return compose(
      name ? nameIsUnique(isUnique) : success(),
      name ? nameLengthIsNotIncreasingMax(name) : success(),
      name ? nameDoesntContainSpecialSymbols(name) : success(),
    );
  }
}
