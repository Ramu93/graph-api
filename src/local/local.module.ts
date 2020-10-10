import { Module } from '@nestjs/common';
import { UserRepository } from 'src/common/repositories/user.repository';
import { LocalController } from './local.controller';

@Module({
  controllers: [LocalController],
  providers: [UserRepository]
})
export class LocalModule {}
