import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { ProfileRepository } from './repositories/profile.repository';

@Module({
  controllers: [InstagramController],
  providers: [ProfileRepository],
})
export class InstagramModule {}
