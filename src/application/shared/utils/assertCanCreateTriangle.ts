import { Invariant, isFail } from '@derbent-ninjas/invariant-composer';
import { Triangle } from 'src/domain/triangle/triangle';
import { CannotCreateException } from '../errors/cannotCreateException';

export const assertCanCreateTriangle = (canCreate: Invariant) => {
  if (isFail(canCreate)) {
    throw new CannotCreateException(canCreate, Triangle.name);
  }
};
