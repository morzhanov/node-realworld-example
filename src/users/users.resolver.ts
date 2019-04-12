import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Args } from '@nestjs/graphql';
import { CreateUserInput, PatchUserInput } from './user.inputs';

@Resolver(User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async getUser(@Args('id') id: number) {
    return await this.usersService.findOneById(id);
  }

  @Mutation(returns => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return await this.usersService.addUser(createUserData);
  }

  @Mutation(returns => User)
  async patchUser(@Args('patchUserData') patchUserData: PatchUserInput) {
    return await this.usersService.patchUser(patchUserData);
  }
}
