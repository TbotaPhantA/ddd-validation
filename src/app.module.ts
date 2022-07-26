import { Module } from '@nestjs/common';
import { TriangleModule } from './application/triangle/triangle.module';
import { ConfiguredTypeORMModule } from './infrastructure/configuredModules/configuredTypeORMModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TriangleModule, ConfiguredTypeORMModule],
})
export class AppModule {}
