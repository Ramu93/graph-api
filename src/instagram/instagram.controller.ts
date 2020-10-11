import { Controller, Get, Logger, Param, Post } from '@nestjs/common';
import {
  Response,
  ResponseType,
} from '../common/interfaces/response.interface';
import { UserRepository } from '../common/repositories/user.repository';
import { InstagramService } from './instagram.service';

const Instagram = require('instagram-web-api');

@Controller('instagram')
export class InstagramController {
  private logger = new Logger(InstagramController.name);
  constructor(readonly instagramService: InstagramService) {}

  @Get('/user/:username')
  async getUserByUsername(
    @Param() searchUser: { username: string },
  ): Promise<Response> {
    const instagramClient = new Instagram({
      username: process.env.INSTAGRAM_USERNAME,
      password: process.env.INSTAGRAM_PASSWORD,
    });

    try {
      const instagramUser = await instagramClient.getUserByUsername({
        username: searchUser.username,
      });
      this.logger.log('🔔 User fetched from Instagram API successfully.');
      this.instagramService.saveUser(instagramUser);
      return { message: ResponseType.SUCCESS };
    } catch (error) {
      this.logger.log('🔔 [FAILURE] User fetching from Instagram API failed.');
      return { message: ResponseType.FAILURE };
    }
  }

  @Get('/follows/:userId')
  async getFollows(@Param() param: { userId: string }): Promise<Response> {
    const instagramClient = new Instagram({
      username: process.env.INSTAGRAM_USERNAME,
      password: process.env.INSTAGRAM_PASSWORD,
    });

    try {
      await instagramClient.login();
      const userFollows = await instagramClient.getFollowers({
        userId: param.userId,
      });
      this.logger.log(
        '🔔 User follows fetched from Instagram API successfully.',
      );
      await this.instagramService.saveFollowers(param.userId, userFollows.data);
      return { message: ResponseType.SUCCESS };
    } catch (error) {
      this.logger.error(
        '🔔 [FAILURE] User follows fetched from Instagram API failed.',
        error,
      );
      return { message: ResponseType.FAILURE };
    }
  }
}
