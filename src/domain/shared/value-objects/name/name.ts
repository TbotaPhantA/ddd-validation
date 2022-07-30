import { Column } from 'typeorm';
import {
  CreateNameFields,
  ExtraNameValidationParams,
  UpdateNameFields,
} from './types';
import { canCreateName, canUpdateName } from './canActivates';
import { assert, Guard } from '@derbent-ninjas/invariant-composer';

export class Name {
  @Column()
  name: string;

  constructor(
    createNameParams: CreateNameFields,
    extraNameValidation: ExtraNameValidationParams,
  ) {
    assert('name', canCreateName(createNameParams, extraNameValidation));
    Object.assign(this, createNameParams);
  }

  @Guard(canUpdateName)
  public update(params: UpdateNameFields, _: ExtraNameValidationParams): void {
    Object.assign(this, params);
  }
}
