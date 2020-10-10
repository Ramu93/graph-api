import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { UserRepository } from '../common/repositories/user.repository';

@Module({
  controllers: [InstagramController],
  providers: [UserRepository],
})
export class InstagramModule {}
