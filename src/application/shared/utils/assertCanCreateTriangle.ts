import {
  display,
  Invariant,
  isFail,
  path,
} from '@derbent-ninjas/invariant-composer';
import { ApplicationException } from '../errors/application-exception';
import { CANNOT_CREATE_TRIANGLE } from '../errors/constants';
import { HttpStatus } from '@nestjs/common';

export const assertCanCreateTriangle = (canCreate: Invariant) => {
  path('triangle', canCreate);

  if (isFail(canCreate)) {
    throw new ApplicationException(
      CANNOT_CREATE_TRIANGLE,
      HttpStatus.BAD_REQUEST,
      {
        ...display(canCreate),
      },
    );
  }
};
