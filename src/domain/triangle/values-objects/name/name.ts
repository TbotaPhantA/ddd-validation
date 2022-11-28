import { assert, compose } from '@derbent-ninjas/invariant-composer';
import {
  nameDoesntContainSpecialSymbols,
  nameIsUnique,
  nameLengthIsNotIncreasingMax,
} from './name-invariants';
import { NameDto } from '../../../../application/triangle/dto/create-triangle-dto/name.dto';

export interface ExtraNameValidation {
  isNameUnique: boolean;
}

export class Name {
  name: string;

  constructor(dto: NameDto, validation: ExtraNameValidation) {
    assert('name', Name.canCreate(dto, validation));
    this.name = dto.name;
  }

  static canCreate(...params: ConstructorParameters<typeof Name>) {
    const [{ name }, { isNameUnique }] = params;

    return compose(
      nameIsUnique(isNameUnique),
      nameLengthIsNotIncreasingMax(name),
      nameDoesntContainSpecialSymbols(name),
    );
  }

  update(dto: NameDto, validation: ExtraNameValidation): void {
    assert('name', Name.canUpdate(dto, validation));
    this.name = dto.name;
  }

  static canUpdate(...params: Parameters<Name['update']>) {
    return Name.canCreate(...params);
  }
}
