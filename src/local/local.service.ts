import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/common/dtos/user.dto';
import { UserRepository } from 'src/common/repositories/user.repository';

@Injectable()
export class LocalService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  async getOneUser(username: string): Promise<UserDto> {
    const user: UserDto = await this.userRepository.findOne(username);
    return user;
  }
}
