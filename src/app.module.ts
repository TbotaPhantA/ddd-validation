import { Module } from '@nestjs/common';
import { ConfiguredTypeormModule } from './configuredAppModules/configured-typeorm.module';

@Module({
  imports: [ConfiguredTypeormModule],
})
export class AppModule {}
