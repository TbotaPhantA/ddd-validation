import { Injectable } from '@nestjs/common';
import { TriangleRepository } from './triangle.repository';
import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { Triangle } from '../../domain/triangle/triangle';
import { assertCanCreateTriangle } from '../shared/utils/assertCanCreateTriangle';
import { path } from '@derbent-ninjas/invariant-composer';

@Injectable()
export class TriangleFactory {
  constructor(private readonly triangleRepository: TriangleRepository) {}

  public create(dto: CreateTriangleInputDto): Triangle {
    const extraValidationParams = this.createExtraValidationParams();

    const canCreate = Triangle.canCreate(dto, extraValidationParams);
    path('triangle', canCreate);
    assertCanCreateTriangle(canCreate);

    return new Triangle(dto, extraValidationParams);
  }

  private createExtraValidationParams() {
    // TODO: make real queries to DB
    const isNameUnique = false;
    const isSideAUnique = false;
    const isSideBUnique = false;
    const isSideCUnique = false;

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
