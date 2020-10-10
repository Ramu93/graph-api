import { Injectable } from '@nestjs/common';
import {
  InjectPersistenceManager,
  QuerySpecification,
} from '@liberation-data/drivine';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { Movie } from '../interfaces/movie.interface';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectPersistenceManager()
    readonly persistenceManager: PersistenceManager,
  ) {}

  async findAll(): Promise<any> {
    return this.persistenceManager.getOne<any>(
      new QuerySpecification(`MATCH (n:Movie) RETURN n LIMIT 25`),
    );
  }
}
