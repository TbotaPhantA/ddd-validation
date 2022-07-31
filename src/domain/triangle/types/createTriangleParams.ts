import { CreateNameParams } from '../../shared/value-objects';
import { CreateSidesParams } from '../values-objects/sides';

export type CreateTriangleParams = {
  name: CreateNameParams;
  sides: CreateSidesParams;
};
