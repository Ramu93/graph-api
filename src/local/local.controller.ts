import { Controller, Get, Param } from '@nestjs/common';
import { UserDto } from 'src/common/dtos/user.dto';
import { LocalService } from './local.service';

@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Get('/users')
  async getUsers(): Promise<UserDto[]> {
    return this.localService.getUsers();
  }

  @Get('/users/:username')
  async getOneUser(@Param() param: { username: string }): Promise<UserDto> {
    return await this.localService.getOneUser(param.username);
  }
}
