import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from '../common/dtos/user.dto';
import { UserRepository } from '../common/repositories/user.repository';

@Injectable()
export class InstagramService {
  private logger = new Logger(InstagramService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async saveUser(user: UserDto): Promise<void> {
    await this.userRepository.save(user);
  }

  async saveFollowers(userId: string, followers: UserDto[]): Promise<void> {
    this.logger.log(`🔔 size of the followers array is ${followers.length}`);
    followers.forEach(async follower => {
      await this.userRepository.saveFollowers(userId, follower);
    });
    return;
  }
}
