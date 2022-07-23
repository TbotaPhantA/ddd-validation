import { ExtraSidesValidation, Sides } from './sides/sides';
import {
  Invariant,
  compose,
  isFail,
  path,
} from '@derbent-ninjas/invariant-composer';
import { Name } from './name/name';
import { display } from '../shared/utils/display';

export interface ExtraValidationData {
  nameData: {
    isUnique: boolean;
  };
  sidesData: ExtraSidesValidation;
}

type CreateTriangleParams = Pick<Triangle, 'sides' | 'name'>;

export class Triangle {
  name: Name;
  sides: Sides;

  // TODO: cover Triangle with unit tests

  constructor(
    params: CreateTriangleParams,
    extraValidationData: ExtraValidationData,
  ) {
    const canCreateTriangle = Triangle.canCreate(params, extraValidationData);
    path('triangle', canCreateTriangle);

    if (isFail(canCreateTriangle)) {
      throw new Error(JSON.stringify(display(canCreateTriangle)));
    }

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
