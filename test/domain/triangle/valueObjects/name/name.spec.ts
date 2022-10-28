import {
  Name,
  NAME_IS_NOT_UNIQUE,
  NAME_LENGTH_CANNOT_INCREASE_MAX,
  NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS,
  NOT_ENOUGH_EXTRA_VALIDATION_PARAMS,
} from '../../../../../src/domain/triangle/values-objects/name';
import { assertFail } from '../../../../../src/domain/shared/utils/assertFail';
import { isSuccess } from '@derbent-ninjas/invariant-composer';

describe('Name', () => {
  const invalidNameTestCases = [
    {
      toString: () =>
        '1 invalid name(special symbol) - should return an failed invariant',
      name: '&',
      isUnique: true,
      expectedErrorMessage: NAME_MUST_NOT_CONTAIN_SPECIAL_SYMBOLS,
    },
    {
      toString: () =>
        '2 invalid name(long name) - should return an failed invariant',
      name: 'aaaaaaaaaabbbbbbbbbbccccccccccdddddddddd', // 40 symbols
      isUnique: true,
      expectedErrorMessage: NAME_LENGTH_CANNOT_INCREASE_MAX,
    },
    {
      toString: () =>
        '3 invalid name(is not unique) - should return an failed invariant',
      name: 'name',
      isUnique: false,
      expectedErrorMessage: NAME_IS_NOT_UNIQUE,
    },
  ] as const;

  describe('canCreate', () => {
    test('valid name - should return success invariant', () => {
      const props = { name: 'John' };
      const validation = { isUnique: true };
      const canCreate = Name.canCreate(props, validation);
      expect(isSuccess(canCreate)).toStrictEqual(true);
    });

    const failTestCases = [...invalidNameTestCases];

    test.each(failTestCases)(
      '%s',
      ({ name, isUnique, expectedErrorMessage }) => {
        const props = { name };
        const validation = { isUnique };
        const canCreate = Name.canCreate(props, validation);
        assertFail(canCreate);
        expect(canCreate.fail[0].customInfo.message).toStrictEqual(
          expectedErrorMessage,
        );
      },
    );
  });

  describe('canUpdate', () => {
    const successTestCases = [
      {
        toString: () => '1',
        props: { name: 'John' },
        validation: { isUnique: true },
      },
      {
        toString: () => '2',
        props: {},
        validation: {},
      },
      {
        toString: () => '3',
        props: {},
        validation: { isUnique: true },
      },
    ];

    test.each(successTestCases)('%s', ({ props, validation }) => {
      const canCreate = Name.canUpdate(props, validation);
      expect(isSuccess(canCreate)).toStrictEqual(true);
    });

    const testCases = [
      ...invalidNameTestCases,
      {
        toString: () => '4',
        name: 'name',
        isUnique: undefined,
        expectedErrorMessage: NOT_ENOUGH_EXTRA_VALIDATION_PARAMS,
      },
    ];

    test.each(testCases)('%s', ({ name, isUnique, expectedErrorMessage }) => {
      const props = { name };
      const validation = { isUnique };
      const canCreate = Name.canUpdate(props, validation);
      assertFail(canCreate);
      expect(canCreate.fail[0].customInfo.message).toStrictEqual(
        expectedErrorMessage,
      );
    });
  });
});
