import { Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Response, ResponseType } from '../common/interfaces/response.interface';
import { SearchUser } from '../common/interfaces/search-user.interface';
import { UserRepository } from '../common/repositories/user.repository';

const Instagram = require('instagram-web-api');

@Controller('instagram')
export class InstagramController {
  private logger = new Logger(InstagramController.name);
  constructor(readonly userRepository: UserRepository) {}

  @Get('/user/:username')
  async getUserByUsername(@Param() searchUser: SearchUser): Promise<Response> {
    const instagramClient = new Instagram({
      username: '',
      password: '',
    });

    try {
      const instagramUser = await instagramClient.getUserByUsername({
        username: searchUser.username,
      });
      this.logger.log('🔔 User fetched from Instagram API successfully.');
      console.log(instagramUser);
      this.userRepository.save(instagramUser);
      return { message: ResponseType.SUCCESS };
    } catch (error) {
      this.logger.log('🔔 [FAILURE] User fetched from Instagram API failed.');
      return { message: ResponseType.FAILURE };
    }
  }

  // @Get('/activites/:userId') {

  // }
}
