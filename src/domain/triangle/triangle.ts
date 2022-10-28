import { Sides } from './values-objects/sides';
import {
  assert,
  compose,
  Invariant,
  path,
} from '@derbent-ninjas/invariant-composer';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreateTriangleProps } from './types';
import { ExtraTriangleValidationParams } from './types';
import { v4 as generateUUIDV4 } from 'uuid';
import { DeepPartial } from '../shared/types/deepPartial';
import { Name } from './values-objects/name';

@Entity()
export class Triangle {
  @PrimaryColumn()
  readonly id: string;

  @Column(() => Name)
  readonly name: Name;

  @Column(() => Sides)
  readonly sides: Sides;
  // TODO: cover with tests

  constructor(
    props: CreateTriangleProps,
    validation: ExtraTriangleValidationParams,
  ) {
    assert('triangle', Triangle.canCreate(props, validation));
    this.id = generateUUIDV4();
    this.name = new Name(props.name, validation.nameData);
    this.sides = new Sides(props.sides, validation.sidesData);
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof Triangle>
  ): Invariant {
    const { sides, name } = params[0];
    const { sidesData, nameData } = params[1];
    const canCreateSides = path('sides', Sides.canCreate(sides, sidesData));
    const canCreateName = path('name', Name.canCreate(name, nameData));

    return compose(canCreateSides, canCreateName);
  }

  public update(
    props: DeepPartial<CreateTriangleProps>,
    validation: DeepPartial<ExtraTriangleValidationParams>,
  ): void {
    assert('triangle', this.canUpdate(props, validation));
    this.name.update(props.name, validation.nameData);
    this.sides.update(props.sides, validation.sidesData);
  }

  public canUpdate(...args: Parameters<Triangle['update']>): Invariant {
    const { name, sides } = args[0];
    const { nameData, sidesData } = args[1];
    const canUpdateName = Name.canUpdate(name, nameData);
    const canUpdateSides = this.sides.canUpdate(sides, sidesData);
    return compose(canUpdateName, canUpdateSides);
  }
}
