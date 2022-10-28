import { Injectable } from '@nestjs/common';
import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { Triangle } from '../../domain/triangle/triangle';
import { assertCanCreateTriangle } from '../shared/utils/assertCanCreateTriangle';
import { TriangleReadService } from './services/triangle-read.service';

@Injectable()
export class TriangleFactory {
  constructor(private readonly triangleReadService: TriangleReadService) {}

  public async create(dto: CreateTriangleInputDto): Promise<Triangle> {
    const validation =
      await this.triangleReadService.getExtraCreateTriangleValidationParams(
        dto,
      );

    const canCreate = Triangle.canCreate(dto, validation);
    assertCanCreateTriangle(canCreate);

    return new Triangle(dto, validation);
  }
}
