import { UpdateTriangleInputDto } from '../dto/update-triangle-dto/update-triangle-input.dto';
import { UpdateTriangleOutputDto } from '../dto/update-triangle-dto/update-triangle-output.dto';
import { TriangleRepository } from '../triangle.repository';
import { TriangleReadService } from './triangle-read.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TriangleUpdateService {
  constructor(
    private readonly triangleRepository: TriangleRepository,
    private readonly triangleReadService: TriangleReadService,
  ) {}

  public async update(
    triangleId: string,
    dto: UpdateTriangleInputDto,
  ): Promise<UpdateTriangleOutputDto> {
    const triangle = await this.triangleReadService.getOneById(triangleId);

    const validationParams =
      await this.triangleReadService.getExtraValidationParams();

    triangle.update(dto, validationParams);

    await this.triangleRepository.save(triangle);

    return UpdateTriangleOutputDto.from(triangle);
  }
}
