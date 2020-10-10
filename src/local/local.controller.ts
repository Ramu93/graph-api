import { Controller, Get, Param } from '@nestjs/common';
import { UserDto } from 'src/common/dtos/user.dto';
import { UserRepository } from 'src/common/repositories/user.repository';

@Controller('local')
export class LocalController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get('/users')
  async getUsers(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  @Get('/users/:username')
  async getOneUsers(@Param() param: { username: string }): Promise<UserDto> {
    const user: UserDto = await this.userRepository.findOne(param.username);
    return user;
  }
}
