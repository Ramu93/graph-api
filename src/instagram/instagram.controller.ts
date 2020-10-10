import { Controller, Get, Post } from '@nestjs/common';
import { ProfileDto } from '../dtos/profile.dto';
import { Profile } from '../interfaces/profile.interface';
import { MovieRepository } from '../repositories/movie.repository';

const Instagram = require('instagram-web-api');

@Controller('instagram')
export class InstagramController {
  constructor(readonly movieRepository: MovieRepository) {}

  @Get()
  async login() {
    // const instagramClient = new Instagram({
    //   username: process.env.INSTAGRAM_USERNAME,
    //   password: process.env.INSTAGRAM_PASSWORD,
    // });

    // await instagramClient.login();
    // const profile = new ProfileDto(await instagramClient.getProfile());

    const movies = this.movieRepository.findAll();
    return movies;
  }
}
