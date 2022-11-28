import {
  ExtraTriangleValidation,
  Triangle,
} from '../../../domain/triangle/triangle';
import { ApplicationException } from '../../shared/errors/application-exception';
import { TRIANGLE_NOT_FOUND } from '../../shared/errors/constants';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TriangleRepository } from '../repositories/triangleRepository';
import { TRIANGLE_REPOSITORY_TOKEN } from '../tokens';
import { CreateTriangleInputDto } from '../dto/create-triangle-dto/create-triangle-input.dto';

@Injectable()
export class TriangleReadService {
  constructor(
    @Inject(TRIANGLE_REPOSITORY_TOKEN)
    private readonly triangleRepository: TriangleRepository,
  ) {}

  public async getOneById(triangleId: string): Promise<Triangle> {
    const triangle = await this.triangleRepository.findOneById(triangleId);

    if (!triangle) {
      throw new ApplicationException(
        TRIANGLE_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

    return triangle;
  }

  public async getExtraCreateTriangleValidationParams(
    dto: CreateTriangleInputDto,
  ): Promise<ExtraTriangleValidation> {
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
      nameValidation: {
        isNameUnique: isNameUnique,
      },
      sidesValidation: {
        sideAValidation: {
          isSideLengthUnique: isSideAUnique,
        },
        sideBValidation: {
          isSideLengthUnique: isSideBUnique,
        },
        sideCValidation: {
          isSideLengthUnique: isSideCUnique,
        },
      },
    };
  }

  public async getExtraUpdateTriangleValidation(
    dto: CreateTriangleInputDto,
  ): Promise<ExtraTriangleValidation> {
    return this.getExtraCreateTriangleValidationParams(dto);
  }
}
