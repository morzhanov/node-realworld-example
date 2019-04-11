import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
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
