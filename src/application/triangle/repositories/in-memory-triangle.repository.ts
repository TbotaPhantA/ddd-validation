import { TriangleRepository } from './triangleRepository';
import { Triangle } from '../../../domain/triangle/triangle';

type TriangleId = string;
type TriangleName = string;
type SideALength = number;
type SideBLength = number;
type SideCLength = number;

export class InMemoryTriangleRepository implements TriangleRepository {
  private readonly storageById: Map<TriangleId, Triangle>;
  private readonly storageByName: Map<TriangleName, Triangle>;
  private readonly storageBySideA: Map<SideALength, Triangle>;
  private readonly storageBySideB: Map<SideBLength, Triangle>;
  private readonly storageBySideC: Map<SideCLength, Triangle>;

  constructor() {
    this.storageById = new Map<TriangleId, Triangle>();
    this.storageByName = new Map<TriangleName, Triangle>();
    this.storageBySideA = new Map<SideALength, Triangle>();
    this.storageBySideB = new Map<SideBLength, Triangle>();
    this.storageBySideC = new Map<SideCLength, Triangle>();
  }

  async findOneById(triangleId: string): Promise<Triangle | undefined> {
    return this.storageById.get(triangleId);
  }

  async findOneByName(name: string): Promise<Triangle | undefined> {
    return this.storageByName.get(name);
  }

  async findOneBySideALength(length: number): Promise<Triangle | undefined> {
    return this.storageBySideA.get(length);
  }

  async findOneBySideBLength(length: number): Promise<Triangle | undefined> {
    return this.storageBySideB.get(length);
  }

  async findOneBySideCLength(length: number): Promise<Triangle | undefined> {
    return this.storageBySideC.get(length);
  }

  async save(triangle: Triangle): Promise<Triangle> {
    this.storageById.set(triangle.id, triangle);
    this.storageByName.set(triangle.name.name, triangle);
    this.storageBySideA.set(triangle.sides.sideA.length, triangle);
    this.storageBySideB.set(triangle.sides.sideA.length, triangle);
    this.storageBySideC.set(triangle.sides.sideA.length, triangle);
    return triangle;
  }
}
