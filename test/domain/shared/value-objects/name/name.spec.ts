import { success, fail } from '@derbent-ninjas/invariant-composer';
import {
  NAME_IS_NOT_UNIQUE,
  NAME_LENGTH_CANNOT_INCREASE_MAX,
  NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS,
  ExtraNameValidationParams,
  canCreateName,
} from '../../../../../src/domain/shared/value-objects';

describe('Name', () => {
  describe('canCreate', () => {
    const uniquenessTestCases = [
      {
        toString: () => 'isUnique=true - should return success invariant',
        params: {
          fields: { name: 'John' },
          validationParams: { isUnique: true } as ExtraNameValidationParams,
        },
        expectedInvariant: success(),
      },
      {
        toString: () => 'isUnique=false - should return fail invariant',
        params: {
          fields: { name: 'John' },
          validationParams: { isUnique: false } as ExtraNameValidationParams,
        },
        expectedInvariant: fail({ message: NAME_IS_NOT_UNIQUE }),
      },
    ];

    const maxLengthTestCases = [
      {
        toString: () => '32 symbols - should return success invariant',
        params: {
          fields: { name: '01234567890123456789012345678901' },
          validationParams: { isUnique: true } as ExtraNameValidationParams,
        },
        expectedInvariant: success(),
      },
      {
        toString: () => '33 symbols - should return fail invariant',
        params: {
          fields: { name: '012345678901234567890123456789012' },
          validationParams: { isUnique: true } as ExtraNameValidationParams,
        },
        expectedInvariant: fail({
          message: NAME_LENGTH_CANNOT_INCREASE_MAX(32, 33),
        }),
      },
    ];

    const specialSymbolsTestCases = [
      {
        toString: () =>
          'without special symbol - should return success invariant',
        params: {
          fields: { name: 'John' },
          validationParams: { isUnique: true } as ExtraNameValidationParams,
        },
        expectedInvariant: success(),
      },
      {
        toString: () => 'with * - should return fail invariant',
        params: {
          fields: { name: 'John*' },
          validationParams: { isUnique: true } as ExtraNameValidationParams,
        },
        expectedInvariant: fail({
          message: NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS,
        }),
      },
    ];

    test.each([
      ...uniquenessTestCases,
      ...maxLengthTestCases,
      ...specialSymbolsTestCases,
    ])('%s', ({ params, expectedInvariant }) => {
      expect(
        canCreateName(params.fields, params.validationParams),
      ).toStrictEqual(expectedInvariant);
    });
  });
});
