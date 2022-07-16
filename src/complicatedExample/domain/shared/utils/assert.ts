import { DomainError } from '../errors/domainError';

export type AssertFn = (
  condition: boolean,
  message: string,
) => asserts condition;

export const assert: AssertFn = function (
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new DomainError(message);
  }
};
