import { Injectable, Logger } from '@nestjs/common';
import { InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { QuerySpecification, Transactional } from '@liberation-data/drivine';
import { UserDto } from '../dtos/user.dto';

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
        `MATCH (user: User {username: "${username}"}) RETURN user`,
      ),
    );
  }

  @Transactional()
  async save(user: UserDto): Promise<void> {
    await this.neo4jSave(user);
  }

  @Transactional()
  async saveFollowers(userId: string, follower: UserDto): Promise<void> {
    const { id, username, full_name } = follower;
    const statement = new QuerySpecification(
      `MATCH (user: User { id: ${userId} }) MERGE (user)<-[r: FOLLOWS {userId: ${userId}, followerId: ${id}} ]-(follower: User {id: ${id}, username: "${username}", full_name: "${full_name}"} )`,
    );
    try {
      await this.persistenceManager.execute(statement);
      this.logger.log(
        `🔔 Relationships for user:${userId} and follower:${id} saved to database.`,
      );
    } catch (error) {
      this.logger.error('🔔 Saving relationship to database failed.', error);
    }
  }

  private async neo4jSave(user: UserDto): Promise<void> {
    const { username, full_name, biography, id, is_business_account } = user;
    let cypher: string = `MERGE (user:User {id: ${id}, username: "${username}", full_name: "${full_name}"`;
    if (user.biography) {
      cypher += `, biography: "${biography}"`;
    }
    if (user.is_business_account) {
      cypher += `,  is_business_account: ${is_business_account}`;
    }
    cypher += `})`;
    const statement = new QuerySpecification(cypher);
    try {
      await this.persistenceManager.execute(statement);
      this.logger.log('🔔 User saved to database.');
    } catch (error) {
      this.logger.error('🔔 Saving user to database failed.', error);
    }
  }
}
