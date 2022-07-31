import { CreateTriangleInputDto } from '../dto/create-triangle-dto/create-triangle-input.dto';
import { CreateTriangleOutputDto } from '../dto/create-triangle-dto/create-triangle-output.dto';
import { TriangleFactory } from '../triangle.factory';
import { TriangleRepository } from '../triangle.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TriangleCreateService {
  constructor(
    private readonly triangleFactory: TriangleFactory,
    private readonly triangleRepository: TriangleRepository,
  ) {}

  public async create(
    dto: CreateTriangleInputDto,
  ): Promise<CreateTriangleOutputDto> {
    const triangle = await this.triangleFactory.create(dto);

    await this.triangleRepository.save(triangle);

    return CreateTriangleOutputDto.from(triangle);
  }
}
