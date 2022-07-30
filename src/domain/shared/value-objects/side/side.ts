import { assert, Guard } from '@derbent-ninjas/invariant-composer';
import { Column } from 'typeorm';
import {
  CreateSideParams,
  UpdateSideParams,
  ExtraSideValidationParams,
} from './types';
import { canCreateSide, canUpdateSide } from './canActivates';

export class Side {
  @Column()
  readonly length: number;

  constructor(
    params: CreateSideParams,
    extraValidationData: ExtraSideValidationParams,
  ) {
    const canCreate = canCreateSide(params, extraValidationData);
    assert('side', canCreate);

    this.length = params.length;
  }

  @Guard(canUpdateSide)
  public update(params: UpdateSideParams, _: ExtraSideValidationParams): void {
    Object.assign(this, params);
  }
}
