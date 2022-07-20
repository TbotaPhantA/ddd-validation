import { ExtraSidesValidation, Sides } from './sides/sides';
import {
  Invariant,
  compose,
  isFail,
  result,
} from '@derbent-ninjas/invariant-composer';
import { Name } from './name/name';

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
    const canCreate = Triangle.canCreate(params, extraValidationData).path(
      'triangle',
    );

    if (isFail(canCreate)) {
      throw new Error(JSON.stringify(result(canCreate)));
    }

    this.sides = params.sides;
  }

  public static canCreate(
    { name, sides }: CreateTriangleParams,
    { nameData, sidesData }: ExtraValidationData,
  ): Invariant {
    const sidesInvariant = Sides.canCreate(sides, sidesData).path('sides');
    const nameInvariant = Name.canCreate(name, nameData).path('name');

    return compose(sidesInvariant, nameInvariant);
  }
}
