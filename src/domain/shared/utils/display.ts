import {
  Fail,
  FailDisplay,
  Invariant,
  SuccessDisplay,
} from '@derbent-ninjas/invariant-composer';

type ReturnType<I extends Invariant> = I extends Fail
  ? FailDisplay
  : SuccessDisplay;

export const display = <I extends Invariant>(invariant: I): ReturnType<I> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  result(invariant);
