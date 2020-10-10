import { Injectable, Logger } from '@nestjs/common';
import {
  InjectCypher,
  InjectPersistenceManager,
} from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import {
  CypherStatement,
  DatabaseType,
  QuerySpecification,
  Transactional,
} from '@liberation-data/drivine';
import { ObjectUtils } from '@liberation-data/drivine/utils';
import { ProfileDto } from '../dtos/profile.dto';

@Injectable()
export class ProfileRepository {
  private logger = new Logger(ProfileRepository.name);

  constructor(
    @InjectPersistenceManager() readonly persistenceManager: PersistenceManager, // @InjectCypher(__dirname + '/cyphers', 'save-profile')
  ) // readonly saveProfile: CypherStatement,
  {}

  /**
   * Creates or updates the profile.
   * @param profile
   */
  @Transactional()
  async save(profile: ProfileDto): Promise<void> {
    await this.neo4jSave(profile);
  }

  /**
   * On Neo4j we can perform a save using an atomic CYPHER statement
   * @param profile
   */
  private async neo4jSave(profile: ProfileDto): Promise<void> {
    // const profileProps = ObjectUtils.primitiveProps(profile);
    const {
      first_name,
      last_name,
      email,
      birthday,
      gender,
      phone_number,
      username,
    } = profile;
    const statement = new QuerySpecification(
      `CREATE (profile:Profile {first_name: "${first_name}", last_name: "${last_name}", email: "${email}}", gender: ${gender}, birthday: "${birthday}", phone_number: "${phone_number}", username: "${username}"})`,
    );
    await this.persistenceManager.execute(statement);
  }
}
