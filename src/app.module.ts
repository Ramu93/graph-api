import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstagramModule } from './instagram/instagram.module';
import {
  DrivineModule,
  DrivineModuleOptions,
  DatabaseRegistry,
  PersistenceManager,
} from '@liberation-data/drivine';
import { ConfigModule } from '@nestjs/config';
import { MovieRepository } from './repositories/movie.repository';

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv('NEO')],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [MovieRepository],
})
export class AppModule {}
