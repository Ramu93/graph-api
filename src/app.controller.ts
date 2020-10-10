import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MovieRepository } from './instagram/repositories/movie.repository';
import {  } from './instagram/dtos/profile.dto';

// const Instagram = require('instagram-web-api');

@Controller()
export class AppController {
  constructor(private readonly movieRepository: MovieRepository) {}
}
