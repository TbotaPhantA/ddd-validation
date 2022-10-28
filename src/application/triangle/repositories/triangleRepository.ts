import { Triangle } from '../../../domain/triangle/triangle';

export interface TriangleRepository {
  findOneById(triangleId: string): Promise<Triangle | undefined>;
  findOneByName(name: string): Promise<Triangle | undefined>;
  findOneBySideALength(length: number): Promise<Triangle | undefined>;
  findOneBySideBLength(length: number): Promise<Triangle | undefined>;
  findOneBySideCLength(length: number): Promise<Triangle | undefined>;
  save(triangle: Triangle): Promise<Triangle>;
}
