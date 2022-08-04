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

  public async findOneByName(value: string): Promise<Triangle | undefined> {
    return this.triangleTypeORMRepository.findOneBy({ name: { name: value } });
  }

  public async findOneBySideALength(
    length: number,
  ): Promise<Triangle | undefined> {
    return this.triangleTypeORMRepository.findOneBy({
      sides: { sideA: { length } },
    });
  }

  public async findOneBySideBLength(
    length: number,
  ): Promise<Triangle | undefined> {
    return this.triangleTypeORMRepository.findOneBy({
      sides: { sideB: { length } },
    });
  }

  public async findOneBySideCLength(
    length: number,
  ): Promise<Triangle | undefined> {
    return this.triangleTypeORMRepository.findOneBy({
      sides: { sideC: { length } },
    });
  }

  public async save(triangle: Triangle): Promise<Triangle> {
    return this.triangleTypeORMRepository.save(triangle);
  }
}
