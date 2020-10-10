import { Injectable, Logger } from '@nestjs/common';
import { InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { QuerySpecification, Transactional } from '@liberation-data/drivine';
import { UserDto } from '../dtos/user.dto';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
  private logger = new Logger(UserRepository.name);

  constructor(
    @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.persistenceManager.query<UserDto>(
      new QuerySpecification(`MATCH (user:User) return user`),
    );
  }

  async findOne(username: string): Promise<UserDto> {
    return await this.persistenceManager.getOne<UserDto>(
      new QuerySpecification(
        `MATCH (user:User {username: "${username}"}) RETURN user LIMIT 1`,
      ),
    );
  }

  @Transactional()
  async save(user: User): Promise<void> {
    await this.neo4jSave(user);
  }

  private async neo4jSave(user: UserDto): Promise<void> {
    const { username, full_name, biography, id, is_business_account } = user;
    const statement = new QuerySpecification(
      `MERGE (user:User {username: "${username}", full_name: "${full_name}", biography: "${biography}}", id: ${id}, is_business_account: ${is_business_account}})`,
    );
    try {
      await this.persistenceManager.execute(statement);
      this.logger.log('🔔 User saved to database.');
    } catch (error) {
      this.logger.error('🔔 Saving user to database failed.', error);
    }
  }
}
