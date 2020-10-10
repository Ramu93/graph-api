import { Module, NestModule } from '@nestjs/common';
import { InstagramModule } from './instagram/instagram.module';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';
import { ConfigModule } from '@nestjs/config';
import { LocalModule } from './local/local.module';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()],
    }),
    ConfigModule.forRoot(),
    InstagramModule,
    LocalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
