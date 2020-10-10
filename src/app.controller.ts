import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MovieRepository } from './repositories/movie.repository';

@Controller()
export class AppController {
  constructor(private readonly movieRepository: MovieRepository) {}

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
