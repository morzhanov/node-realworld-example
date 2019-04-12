import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserInput, PatchUserInput } from './user.inputs';

// TODO: add error handlers
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @Inject('logger')
    private readonly logger: Logger,
  ) {}

  public async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  public async addUser(userData: CreateUserInput): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (user) {
      throw new Error('User with this email already exists');
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
