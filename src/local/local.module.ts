import { Module } from '@nestjs/common';
import { UserRepository } from '../common/repositories/user.repository';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';

@Module({
  controllers: [LocalController],
  providers: [LocalService, UserRepository],
})
export class LocalModule {}
