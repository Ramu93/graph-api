import { Injectable } from '@nestjs/common';
import { UserDto } from '../common/dtos/user.dto';
import { UserRepository } from '../common/repositories/user.repository';

@Injectable()
export class LocalService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  async getOneUser(username: string): Promise<UserDto> {
    return await this.userRepository.findOne(username);
  }

  async getOneWithFollowers(userId: number): Promise<UserDto[]> {
    const data = await this.userRepository.findOneWithFollowers(userId);
    return data.map(ele => ele[1])
  }
}
