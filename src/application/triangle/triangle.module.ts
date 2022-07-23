import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TriangleController } from './triangle.controller';
import { TriangleService } from './triangle.service';
import { TriangleFactory } from './triangle.factory';
import { TriangleRepository } from './triangle.repository';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [TriangleController],
  providers: [TriangleService, TriangleFactory, TriangleRepository],
})
export class TriangleModule {}
