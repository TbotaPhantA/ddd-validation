import {
  Invariant,
  isFail,
  path as setPath,
} from '@derbent-ninjas/invariant-composer';
import { display } from '../utils/display';
import { DomainError } from './domain-error';

export const assertCanCreate = (path: string, canCreate: Invariant) => {
  if (isFail(canCreate)) {
    throw new DomainError(JSON.stringify(display(setPath(path, canCreate))));
  }
};
