import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneById(id: number): Promise<User> {
    return new Promise(resolve => {
      const user = new User();
      user.id = id;
      user.email = 'email';
      user.name = 'name';
      resolve(user);
    });
  }
}
