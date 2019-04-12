import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }
}
