import { Module, NestModule } from '@nestjs/common';
import { InstagramModule } from './instagram/instagram.module';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()],
    }),
    ConfigModule.forRoot(),
    InstagramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
