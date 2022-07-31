import { Triangle } from '../../../domain/triangle/triangle';
import { TriangleRepository } from '../triangle.repository';
import { ApplicationException } from '../../shared/errors/application-exception';
import { TRIANGLE_NOT_FOUND } from '../../shared/errors/constants';
import { ExtraTriangleValidationParams } from '../../../domain/triangle/types';
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

  public async getExtraValidationParams(): Promise<ExtraTriangleValidationParams> {
    return {
      nameData: {
        isUnique: false,
      },
      sidesData: {
        sideAData: {
          isUnique: false,
        },
        sideBData: {
          isUnique: false,
        },
        sideCData: {
          isUnique: false,
        },
      },
    };
  }
}
