import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Args } from '@nestjs/graphql';

@Resolver(User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async getUser(@Args('id') id: number) {
    return await this.usersService.findOneById(id);
  }
}
