import { BadRequestException, Injectable } from '@nestjs/common';
import { TriangleRepository } from './triangle.repository';
import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { Triangle } from '../../domain/triangle/triangle';
import { isFail } from '@derbent-ninjas/invariant-composer';

@Injectable()
export class TriangleFactory {
  constructor(private readonly triangleRepository: TriangleRepository) {}

  public create(dto: CreateTriangleInputDto): Triangle {
    // TODO: make real queires to DB
    const isNameUnique = false;
    const isSideAUnique = false;
    const isSideBUnique = false;
    const isSideCUnique = false;

    const extraValidationParams = {
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

    const canCreate = Triangle.canCreate(dto, extraValidationParams);

    if (isFail(canCreate)) {
      // TODO: create assert function which throws special error,
      //  then exception filter receives this error and properly displays at response
      throw new BadRequestException('cannot create');
    }

    return new Triangle(dto, extraValidationParams);
  }
}
