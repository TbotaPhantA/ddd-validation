import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Triangle } from '../../domain/triangle/triangle';
import { Repository } from 'typeorm';

@Injectable()
export class TriangleRepository {
  constructor(
    @InjectRepository(Triangle)
    private readonly triangleTypeORMRepository: Repository<Triangle>,
  ) {}

  public async findOneById(triangleId: string): Promise<Triangle> {
    return this.triangleTypeORMRepository.findOneBy({ id: triangleId });
  }

  public async save(triangle: Triangle): Promise<Triangle> {
    return this.triangleTypeORMRepository.save(triangle);
  }
}
