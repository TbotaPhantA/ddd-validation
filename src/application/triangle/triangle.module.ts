import { Module } from '@nestjs/common';
import { TriangleController } from './triangle.controller';
import { TriangleFactory } from './triangle.factory';
import { TriangleReadService } from './services/triangle-read.service';
import { TriangleCreateService } from './services/triangle-create.service';
import { TriangleUpdateService } from './services/triangle-update.service';
import { TRIANGLE_REPOSITORY_TOKEN } from './tokens';
import { InMemoryTriangleRepository } from './repositories/in-memory-triangle.repository';

@Module({
  controllers: [TriangleController],
  providers: [
    TriangleReadService,
    TriangleCreateService,
    TriangleUpdateService,
    TriangleFactory,
    {
      provide: TRIANGLE_REPOSITORY_TOKEN,
      useClass: InMemoryTriangleRepository,
    },
  ],
})
export class TriangleModule {}
