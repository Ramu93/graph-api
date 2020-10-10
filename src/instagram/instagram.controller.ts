import { Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Response, ResponseType } from './interfaces/response.interface';
import { SearchUser } from './interfaces/search-user.interface';
import { UserRepository } from './repositories/user.repository';

const Instagram = require('instagram-web-api');

@Controller('instagram')
export class InstagramController {
  private logger = new Logger(InstagramController.name);
  constructor(readonly userRpository: UserRepository) {}

  // @Get('/getProfileData')
  // async getDataFromInstagram(): Promise<Response> {
  //   try {
  //     const instagramClient = new Instagram({
  //       username: process.env.INSTAGRAM_USERNAME,
  //       password: process.env.INSTAGRAM_PASSWORD,
  //     });

  //     //login
  //     await instagramClient.login();

  //     // get profile details and save to database
  //     const profile = new ProfileDto(await instagramClient.getProfile());

  //     // logout
  //     // await instagramClient.logout();
  //     // const movies = this.movieRepository.findAll();

  //     this.logger.log('🔔 [SUCCESS] Profile fetch success.');
  //     return { message: ResponseType.SUCCESS };
  //   } catch (error) {
  //     this.logger.error('🔔 [FAILURE] Profile fetch failed.', error);
  //     return { message: ResponseType.FAILURE };
  //   }
  // }

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
      this.userRpository.save(instagramUser);
      return { message: ResponseType.SUCCESS };
    } catch (error) {
      return { message: ResponseType.FAILURE };
    }
  }
}
