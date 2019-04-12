import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

// TODO: remove this when handle mutattions
export interface CreateUserData {
  name: string;
  email: string;
}

export interface PatchUserData {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  public async addUser(userData: CreateUserData): Promise<User> {
    return this.userRepository.create(userData);
  }

  public async patchUser(userData: PatchUserData): Promise<void> {
    await this.userRepository.update({ id: userData.id }, userData);
  }
}
