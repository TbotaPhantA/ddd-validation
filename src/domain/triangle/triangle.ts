import { ExtraSidesValidation, Sides } from './values-objects/sides';
import {
  assert,
  compose,
  Invariant,
  path,
} from '@derbent-ninjas/invariant-composer';
import { v4 as generateUUIDV4 } from 'uuid';
import { ExtraNameValidation, Name } from './values-objects/name';
import { CreateTriangleInputDto } from '../../application/triangle/dto/create-triangle-dto/create-triangle-input.dto';

export interface ExtraTriangleValidation {
  nameValidation: ExtraNameValidation;
  sidesValidation: ExtraSidesValidation;
}

export class Triangle {
  readonly id: string;
  readonly name: Name;
  readonly sides: Sides;
  // TODO: cover with tests

  constructor(
    dto: CreateTriangleInputDto,
    validation: ExtraTriangleValidation,
  ) {
    assert('triangle', Triangle.canCreate(dto, validation));
    this.id = generateUUIDV4();
    this.name = new Name(dto.name, validation.nameValidation);
    this.sides = new Sides(dto.sides, validation.sidesValidation);
  }

  static canCreate(
    ...params: ConstructorParameters<typeof Triangle>
  ): Invariant {
    const { sides, name } = params[0];
    const { sidesValidation, nameValidation } = params[1];
    const canCreateSides = path(
      'sides',
      Sides.canCreate(sides, sidesValidation),
    );
    const canCreateName = path('name', Name.canCreate(name, nameValidation));

    return compose(canCreateSides, canCreateName);
  }

  update(
    dto: CreateTriangleInputDto,
    validation: ExtraTriangleValidation,
  ): void {
    assert('triangle', this.canUpdate(dto, validation));
    this.name.update(dto.name, validation.nameValidation);
    this.sides.update(dto.sides, validation.sidesValidation);
  }

  canUpdate(...args: Parameters<Triangle['update']>): Invariant {
    return Triangle.canCreate(...args);
  }
}
