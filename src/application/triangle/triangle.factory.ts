import { Injectable } from '@nestjs/common';
import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { Triangle } from '../../domain/triangle/triangle';
import { assertCanCreateTriangle } from '../shared/utils/assertCanCreateTriangle';
import { TriangleReadService } from './services/triangle-read.service';
import { canCreateTriangle } from '../../domain/triangle/canActivates';

@Injectable()
export class TriangleFactory {
  constructor(private readonly triangleReadService: TriangleReadService) {}

  public async create(dto: CreateTriangleInputDto): Promise<Triangle> {
    const extraValidationParams =
      await this.triangleReadService.getExtraValidationParams();

    const canCreate = canCreateTriangle(dto, extraValidationParams);
    assertCanCreateTriangle(canCreate);

    return new Triangle(dto, extraValidationParams);
  }
}
