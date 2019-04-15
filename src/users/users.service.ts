import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { PatchUserInput } from './user.inputs';
import { RegistrationInput } from '../auth/auth.inputs';
import { GqlError } from '../utils/gql.error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  public async addUser(userData: RegistrationInput): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (user) {
      throw new GqlError({
        error: 'User with this email already exists',
        field: 'email',
      });
    }

    user = new User();
    Object.keys(userData).forEach(key => (user[key] = userData[key]));
    return this.userRepository.save(user);
  }

  public async patchUser(userData: PatchUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ id: userData.id });

    if (!user) {
      throw new Error('User not exists');
    }

    Object.keys(userData).forEach(key => (user[key] = userData[key]));
    return this.userRepository.save(user);
  }
}
