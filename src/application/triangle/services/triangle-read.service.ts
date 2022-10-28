import { Triangle } from '../../../domain/triangle/triangle';
import { ApplicationException } from '../../shared/errors/application-exception';
import { TRIANGLE_NOT_FOUND } from '../../shared/errors/constants';
import {
  CreateTriangleProps,
  ExtraTriangleValidationParams,
} from '../../../domain/triangle/types';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeepPartial } from '../../../domain/shared/types/deepPartial';
import { TriangleRepository } from '../repositories/triangleRepository';
import { TRIANGLE_REPOSITORY_TOKEN } from '../tokens';

@Injectable()
export class TriangleReadService {
  constructor(
    @Inject(TRIANGLE_REPOSITORY_TOKEN)
    private readonly triangleRepository: TriangleRepository,
  ) {}

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

  public async getExtraCreateTriangleValidationParams(
    dto: CreateTriangleProps,
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

  public async getExtraUpdateTriangleValidation(
    dto: DeepPartial<CreateTriangleProps>,
  ): Promise<ExtraTriangleValidationParams> {
    const [
      triangleWithSameName,
      triangleWithSameSideA,
      triangleWithSameSideB,
      triangleWithSameSideC,
    ] = await Promise.all([
      this.triangleRepository.findOneByName(dto.name.name),
      this.triangleRepository.findOneBySideALength(dto.sides.sideA.length),
      this.triangleRepository.findOneBySideBLength(dto.sides.sideB.length),
      this.triangleRepository.findOneBySideCLength(dto.sides.sideC.length),
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
