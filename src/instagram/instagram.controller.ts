import { Controller, Get, Logger, Post } from '@nestjs/common';
import { ProfileDto } from './dtos/profile.dto';
import { ProfileRepository } from './repositories/profile.repository';

const Instagram = require('instagram-web-api');

@Controller('instagram')
export class InstagramController {
  constructor(readonly profileRepository: ProfileRepository) {}

  @Get('/getData')
  async getDataFromInstagram(): Promise<{message: string}> {
    try {
      const instagramClient = new Instagram({
        username: process.env.INSTAGRAM_USERNAME,
        password: process.env.INSTAGRAM_PASSWORD,
      });
  
      //login
      await instagramClient.login();
  
      // get profile details and save to database
      const profile = new ProfileDto(await instagramClient.getProfile());
      await this.profileRepository.save(profile);
  
      // logout
      // await instagramClient.logout();
      // const movies = this.movieRepository.findAll();
      
      Logger.log('🔔 [SUCCESS] Data fetched from Instagram API and stored.');
      return {message: 'success'};
    } catch (error) {
      Logger.error('🔔 [FAILURE] Data fetch and store failed.', error);
      return {message: 'failure'};
    }
  }
}
