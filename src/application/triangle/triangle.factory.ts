import { Injectable } from '@nestjs/common';
import { TriangleRepository } from './triangle.repository';
import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { ExtraValidationData, Triangle } from '../../domain/triangle/triangle';
import { assertCanCreateTriangle } from '../shared/utils/assertCanCreateTriangle';
import { path } from '@derbent-ninjas/invariant-composer';

@Injectable()
export class TriangleFactory {
  constructor(private readonly triangleRepository: TriangleRepository) {}

  public async create(dto: CreateTriangleInputDto): Promise<Triangle> {
    const extraValidationParams = await this.createExtraValidationParams();

    const canCreate = Triangle.canCreate(dto, extraValidationParams);
    path('triangle', canCreate);
    assertCanCreateTriangle(canCreate);

    return new Triangle(dto, extraValidationParams);
  }

  private async createExtraValidationParams(): Promise<ExtraValidationData> {
    // TODO: make real queries to DB
    const [isNameUnique, isSideAUnique, isSideBUnique, isSideCUnique] =
      await Promise.all([false, false, false, false]);

    return {
      nameData: {
        isUnique: isNameUnique,
      },
      sidesData: {
        sideAData: {
          isUnique: isSideAUnique,
        },
        sideBData: {
          isUnique: isSideBUnique,
        },
        sideCData: {
          isUnique: isSideCUnique,
        },
      },
    };
  }
}
