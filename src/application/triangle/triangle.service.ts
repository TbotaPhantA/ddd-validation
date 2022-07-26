import { CreateTriangleInputDto } from './dto/create-triangle-dto/create-triangle-input.dto';
import { Injectable } from '@nestjs/common';
import { TriangleFactory } from './triangle.factory';
import { TriangleRepository } from './triangle.repository';
import { CreateTriangleOutputDto } from './dto/create-triangle-dto/create-triangle-output.dto';

@Injectable()
export class TriangleService {
  constructor(
    private readonly triangleFactory: TriangleFactory,
    private readonly triangleRepository: TriangleRepository,
  ) {}

  public async create(dto: CreateTriangleInputDto) {
    const triangle = await this.triangleFactory.create(dto);

    await this.triangleRepository.save(triangle);

    return CreateTriangleOutputDto.from(triangle);
  }
}
