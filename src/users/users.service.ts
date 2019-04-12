import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserInput, PatchUserInput } from './user.inputs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  public async addUser(userData: CreateUserInput): Promise<User> {
    return this.userRepository.create(userData);
  }

  public async patchUser(userData: PatchUserInput): Promise<void> {
    await this.userRepository.update({ id: userData.id }, userData);
  }
}
