import { CreateTriangleInputDto } from '../dto/create-triangle-dto/create-triangle-input.dto';
import { CreateTriangleOutputDto } from '../dto/create-triangle-dto/create-triangle-output.dto';
import { TriangleFactory } from '../triangle.factory';
import { Inject, Injectable } from '@nestjs/common';
import { TriangleRepository } from '../repositories/triangleRepository';
import { TRIANGLE_REPOSITORY_TOKEN } from '../tokens';

@Injectable()
export class TriangleCreateService {
  constructor(
    @Inject(TRIANGLE_REPOSITORY_TOKEN)
    private readonly triangleRepository: TriangleRepository,
    private readonly triangleFactory: TriangleFactory,
  ) {}

  public async create(
    dto: CreateTriangleInputDto,
  ): Promise<CreateTriangleOutputDto> {
    const triangle = await this.triangleFactory.create(dto);
    await this.triangleRepository.save(triangle);
    return CreateTriangleOutputDto.from(triangle);
  }
}
