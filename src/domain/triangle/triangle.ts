import { Sides } from './values-objects/sides';
import {
  assert,
  compose,
  Invariant,
  success,
} from '@derbent-ninjas/invariant-composer';
import { Name, canUpdateName } from '../shared/value-objects';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreateTriangleParams } from './types';
import { ExtraTriangleValidationParams } from './types';
import { canCreateTriangle } from './canActivates';
import { UpdateTriangleParams } from './types';
import { v4 as generateUUIDV4 } from 'uuid';

@Entity()
export class Triangle {
  @PrimaryColumn()
  readonly id: string;

  @Column(() => Name)
  readonly name: Name;

  @Column(() => Sides)
  readonly sides: Sides;

  constructor(
    params: CreateTriangleParams,
    extraValidationData: ExtraTriangleValidationParams,
  ) {
    const canCreate = canCreateTriangle(params, extraValidationData);
    assert('triangle', canCreate);

    Object.assign(this, params);
    this.id = generateUUIDV4();
  }

  public update(
    params: UpdateTriangleParams,
    extraTriangleValidationParams: ExtraTriangleValidationParams,
  ): void {
    const canUpdate = this.canUpdate(params, extraTriangleValidationParams);
    assert('triangle', canUpdate);

    this.name.update(params.name, extraTriangleValidationParams.nameData);
    this.sides.update(params.sides, extraTriangleValidationParams.sidesData);
  }

  public canUpdate(
    { name, sides }: UpdateTriangleParams,
    { nameData, sidesData }: ExtraTriangleValidationParams,
  ): Invariant {
    const canUpdateNameResult = name
      ? canUpdateName(name, nameData)
      : success();
    const canUpdateSidesResult = sides
      ? this.sides.canUpdate(sides, sidesData)
      : success();

    return compose(canUpdateNameResult, canUpdateSidesResult);
  }
}
