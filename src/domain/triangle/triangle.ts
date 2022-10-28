import { Sides } from './values-objects/sides';
import {
  assert,
  compose,
  Invariant,
  path,
} from '@derbent-ninjas/invariant-composer';
import { CreateTriangleProps } from './types';
import { ExtraTriangleValidationParams } from './types';
import { v4 as generateUUIDV4 } from 'uuid';
import { DeepPartial } from '../shared/types/deepPartial';
import { Name } from './values-objects/name';

export class Triangle {
  readonly id: string;
  readonly name: Name;
  readonly sides: Sides;
  // TODO: cover with tests

  constructor(
    props: CreateTriangleProps,
    validation: ExtraTriangleValidationParams,
  ) {
    assert('triangle', Triangle.canCreate(props, validation));
    this.id = generateUUIDV4();
    this.name = new Name(props.name, validation.nameValidation);
    this.sides = new Sides(props.sides, validation.sidesValidation);
  }

  public static canCreate(
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

  public update(
    props: DeepPartial<CreateTriangleProps>,
    validation: DeepPartial<ExtraTriangleValidationParams>,
  ): void {
    assert('triangle', this.canUpdate(props, validation));
    this.name.update(props.name, validation.nameValidation);
    this.sides.update(props.sides, validation.sidesValidation);
  }

  public canUpdate(...args: Parameters<Triangle['update']>): Invariant {
    const { name, sides } = args[0];
    const { nameValidation, sidesValidation } = args[1];
    const canUpdateName = Name.canUpdate(name, nameValidation);
    const canUpdateSides = this.sides.canUpdate(sides, sidesValidation);
    return compose(canUpdateName, canUpdateSides);
  }
}
