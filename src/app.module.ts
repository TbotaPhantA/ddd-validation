import { Module } from '@nestjs/common';
import { TriangleModule } from './application/triangle/triangle.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TriangleModule],
})
export class AppModule {}
