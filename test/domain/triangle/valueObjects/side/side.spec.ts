import {
  LENGTH_MUST_NOT_BE_NEGATIVE,
  LENGTH_MUST_NOT_INCREASE_MAXIMUM,
  NOT_ENOUGH_DATA_FOR_SIDE_CREATION,
} from '../../../../../src/domain/triangle/values-objects/side/error-messages';
import { Side } from '../../../../../src/domain/triangle/values-objects/side';
import { assertFail } from '../../../../../src/domain/shared/utils/assertFail';
import { isSuccess } from '@derbent-ninjas/invariant-composer';

describe('Side', () => {
  const invalidSideTestCases = [
    {
      toString: () =>
        '1 invalid side(negative length) - should return a failed invariant',
      props: { length: -1 },
      validation: { isUnique: true },
      expectedErrorMessage: LENGTH_MUST_NOT_BE_NEGATIVE,
    },
    {
      toString: () =>
        '2 invalid side(too big length) - should return a failed invariant',
      props: { length: 101 }, // more than 100
      validation: { isUnique: true },
      expectedErrorMessage: LENGTH_MUST_NOT_INCREASE_MAXIMUM,
    },
    {
      toString: () =>
        '3 invalid side(too big length) - should return a failed invariant',
      props: { length: 101 }, // more than 100
      validation: { isUnique: true },
      expectedErrorMessage: LENGTH_MUST_NOT_INCREASE_MAXIMUM,
    },
  ] as const;

  describe('canCreate', () => {
    const successTestCases = [
      {
        toString: () => '1',
        props: { length: 1 },
        validation: { isUnique: true },
      },
    ];

    test.each(successTestCases)('%s', ({ props, validation }) => {
      const canCreate = Side.canCreate(props, validation);
      expect(isSuccess(canCreate)).toStrictEqual(true);
    });

    const failedTestCases = [...invalidSideTestCases];

    test.each(failedTestCases)(
      '%s',
      ({ props, validation, expectedErrorMessage }) => {
        const canCreate = Side.canCreate(props, validation);
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
        props: { length: 1 },
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
      const canUpdate = Side.canUpdate(props, validation);
      expect(isSuccess(canUpdate)).toStrictEqual(true);
    });

    const failTestCases = [
      ...invalidSideTestCases,
      {
        toString: () => '4',
        props: { length: 1 },
        validation: {},
        expectedErrorMessage: NOT_ENOUGH_DATA_FOR_SIDE_CREATION,
      },
    ];

    test.each(failTestCases)(
      '%s',
      ({ props, validation, expectedErrorMessage }) => {
        const canCreate = Side.canUpdate(props, validation);
        assertFail(canCreate);
        expect(canCreate.fail[0].customInfo.message).toStrictEqual(
          expectedErrorMessage,
        );
      },
    );
  });
});
