import { UpdateTriangleInputDto } from '../dto/update-triangle-dto/update-triangle-input.dto';
import { UpdateTriangleOutputDto } from '../dto/update-triangle-dto/update-triangle-output.dto';
import { TriangleReadService } from './triangle-read.service';
import { Inject, Injectable } from '@nestjs/common';
import { TriangleRepository } from '../repositories/triangleRepository';
import { TRIANGLE_REPOSITORY_TOKEN } from '../tokens';

@Injectable()
export class TriangleUpdateService {
  constructor(
    @Inject(TRIANGLE_REPOSITORY_TOKEN)
    private readonly triangleRepository: TriangleRepository,
    private readonly triangleReadService: TriangleReadService,
  ) {}

  public async update(
    triangleId: string,
    dto: UpdateTriangleInputDto,
  ): Promise<UpdateTriangleOutputDto> {
    const triangle = await this.triangleReadService.getOneById(triangleId);

    const validation =
      await this.triangleReadService.getExtraUpdateTriangleValidation(dto);

    triangle.update(dto, validation);

    await this.triangleRepository.save(triangle);

    return UpdateTriangleOutputDto.from(triangle);
  }
}
