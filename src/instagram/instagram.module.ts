import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { UserRepository } from '../common/repositories/user.repository';
import { InstagramService } from './instagram.service';

@Module({
  controllers: [InstagramController],
  providers: [InstagramService, UserRepository],
})
export class InstagramModule {}
