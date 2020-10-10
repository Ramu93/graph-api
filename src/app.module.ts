import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstagramModule } from './instagram/instagram.module';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';
import { ConfigModule } from '@nestjs/config';
import { MovieRepository } from './instagram/repositories/movie.repository';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()],
    }),
    ConfigModule.forRoot(),
    InstagramModule,
  ],
  controllers: [AppController],
  providers: [MovieRepository],
})
export class AppModule {}
