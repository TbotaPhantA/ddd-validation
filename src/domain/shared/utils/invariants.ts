import { Either, getApplicativeValidation, map } from 'fp-ts/Either';
import { getSemigroup, NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { pipe } from 'fp-ts/function';
import { sequenceT } from 'fp-ts/Apply';

type ArgumentEither = Either<NonEmptyArray<string>, unknown>;

export const invariants = (
  firstEither: ArgumentEither,
  ...restEithers: ArgumentEither[]
): Either<NonEmptyArray<string>, undefined> => {
  return pipe(
    sequenceT(getApplicativeValidation(getSemigroup<string>()))(
      firstEither,
      ...restEithers,
    ),
    map(() => undefined),
  );
};
