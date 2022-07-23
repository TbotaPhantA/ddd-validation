import { Injectable } from '@nestjs/common';
import { TriangleRepository } from './triangle.repository';
import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { Triangle } from '../../domain/triangle/triangle';

@Injectable()
export class TriangleFactory {
  constructor(private readonly triangleRepository: TriangleRepository) {}

  public create(dto: CreateTriangleInputDto): Triangle {
    const isNameUnique = false;
    const isSideAUnique = false;
    const isSideBUnique = false;
    const isSideCUnique = false;

    return new Triangle(dto, {
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
    });
  }
}
