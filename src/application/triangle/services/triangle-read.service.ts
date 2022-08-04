import { Triangle } from '../../../domain/triangle/triangle';
import { TriangleRepository } from '../triangle.repository';
import { ApplicationException } from '../../shared/errors/application-exception';
import { TRIANGLE_NOT_FOUND } from '../../shared/errors/constants';
import {
  CreateTriangleParams,
  ExtraTriangleValidationParams,
} from '../../../domain/triangle/types';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class TriangleReadService {
  constructor(private readonly triangleRepository: TriangleRepository) {}

  public async getOneById(triangleId: string): Promise<Triangle> {
    const triangle = this.triangleRepository.findOneById(triangleId);

    if (!triangle) {
      throw new ApplicationException(
        TRIANGLE_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

    return triangle;
  }

  // TODO: make extra validation params for UPDATE Triangle. Cause properties there are optional.
  public async getExtraCreateTriangleValidationParams(
    dto: CreateTriangleParams,
  ): Promise<ExtraTriangleValidationParams> {
    const [
      triangleWithSameName,
      triangleWithSameSideA,
      triangleWithSameSideB,
      triangleWithSameSideC,
    ] = await Promise.all([
      this.triangleRepository.findOneByName(dto.name.name),
      this.triangleRepository.findOneBySideALength(dto.sides.sideA.length),
      this.triangleRepository.findOneBySideALength(dto.sides.sideB.length),
      this.triangleRepository.findOneBySideALength(dto.sides.sideC.length),
    ]);

    const isNameUnique = !triangleWithSameName;
    const isSideAUnique = !triangleWithSameSideA;
    const isSideBUnique = !triangleWithSameSideB;
    const isSideCUnique = !triangleWithSameSideC;

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
