import { CreateNameProps } from '../values-objects/name';
import { CreateSidesProps } from '../values-objects/sides';

export type CreateTriangleProps = {
  name: CreateNameProps;
  sides: CreateSidesProps;
};
