import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TriangleController } from './triangle.controller';
import { TriangleFactory } from './triangle.factory';
import { TriangleRepository } from './triangle.repository';
import { Triangle } from '../../domain/triangle/triangle';
import { TriangleReadService } from './services/triangle-read.service';
import { TriangleCreateService } from './services/triangle-create.service';
import { TriangleUpdateService } from './services/triangle-update.service';

@Module({
  imports: [TypeOrmModule.forFeature([Triangle])],
  controllers: [TriangleController],
  providers: [
    TriangleReadService,
    TriangleCreateService,
    TriangleUpdateService,
    TriangleFactory,
    TriangleRepository,
  ],
})
export class TriangleModule {}
