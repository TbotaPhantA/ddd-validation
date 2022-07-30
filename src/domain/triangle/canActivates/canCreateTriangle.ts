import { CreateTriangleParams, ExtraTriangleValidationParams } from '../types';
import { compose, Invariant, path } from '@derbent-ninjas/invariant-composer';
import { canCreateSides } from '../values-objects/sides';
import { canCreateName } from '../../shared/value-objects';

export const canCreateTriangle = (
  { name, sides }: CreateTriangleParams,
  { nameData, sidesData }: ExtraTriangleValidationParams,
): Invariant => {
  const sidesInvariant = path('sides', canCreateSides(sides, sidesData));
  const nameInvariant = path('name', canCreateName(name, nameData));

  return compose(sidesInvariant, nameInvariant);
};
