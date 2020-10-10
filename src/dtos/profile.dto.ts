import { Profile } from '../interfaces/profile.interface';

export class ProfileDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly username: string;
  readonly phone_number: string;
  readonly gender: number;
  readonly birthday: string;

  constructor(profile: Profile) {
    const {
      first_name,
      last_name,
      email,
      username,
      phone_number,
      gender,
      birthday,
    } = profile;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.username = username;
    this.phone_number = phone_number;
    this.gender = gender;
    this.birthday = birthday;
  }
}
