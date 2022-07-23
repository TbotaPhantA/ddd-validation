import { Module } from '@nestjs/common';
import { TriangleModule } from './application/triangle/triangle.module';
import { ConfiguredTypeORMModule } from './infrastructure/configuredModules/configuredTypeORMModule';

@Module({
  imports: [TriangleModule, ConfiguredTypeORMModule],
})
export class AppModule {}
