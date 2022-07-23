import { ExtraSidesValidation, Sides } from './sides/sides';
import { Invariant, compose, path } from '@derbent-ninjas/invariant-composer';
import { Name } from '../shared/value-objects/name/name';
import { Column, Entity } from 'typeorm';
import { assertCanCreate } from '../shared/errors/assertCanCreate';

export interface ExtraValidationData {
  nameData: {
    isUnique: boolean;
  };
  sidesData: ExtraSidesValidation;
}

type CreateTriangleParams = Pick<Triangle, 'sides' | 'name'>;

@Entity()
export class Triangle {
  @Column(() => Name)
  name: Name;

  @Column(() => Sides)
  sides: Sides;

  constructor(
    params: CreateTriangleParams,
    extraValidationData: ExtraValidationData,
  ) {
    const canCreate = Triangle.canCreate(params, extraValidationData);
    assertCanCreate('triangle', canCreate);

    this.name = params.name;
    this.sides = params.sides;
  }

  public static canCreate(
    { name, sides }: CreateTriangleParams,
    { nameData, sidesData }: ExtraValidationData,
  ): Invariant {
    const sidesInvariant = path('sides', Sides.canCreate(sides, sidesData));
    const nameInvariant = path('name', Name.canCreate(name, nameData));

    return compose(sidesInvariant, nameInvariant);
  }
}
