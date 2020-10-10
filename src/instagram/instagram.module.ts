import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { MovieRepository } from '../repositories/movie.repository';

@Module({
  controllers: [InstagramController],
  providers: [InstagramService, MovieRepository],
})
export class InstagramModule {}
