import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { NAME_LENGTH_CANNOT_INCREASE_MAX } from './error-messages';

export const nameLengthIsNotIncreasingMax = (name: string): Invariant => {
  const maxLength = 32;
  return name.length <= maxLength
    ? success()
    : fail({
        message: NAME_LENGTH_CANNOT_INCREASE_MAX,
      });
};
