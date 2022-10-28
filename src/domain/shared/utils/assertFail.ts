import { Fail, Invariant, isSuccess } from '@derbent-ninjas/invariant-composer';

export function assertFail(invariant: Invariant): asserts invariant is Fail {
  if (isSuccess(invariant)) {
    throw new Error('INVARIANT_MUST_BE_A_FAIL');
  }
}
