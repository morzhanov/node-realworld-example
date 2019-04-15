import { Args, Query, Resolver, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { PatchUserInput } from './user.inputs';
import { GqlAuthGuard } from '../auth/gql.auth.guard';

@Resolver(User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(new GqlAuthGuard('jwt'))
  @Query(returns => User)
  async me(@Context() ctx: any) {
    return this.usersService.findOneById(ctx.user.id);
  }

  @UseGuards(new GqlAuthGuard('jwt'))
  @Query(returns => User)
  async getUser(@Args('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @UseGuards(new GqlAuthGuard('jwt'))
  @Mutation(returns => User)
  async patchUser(@Args('patchUserData') patchUserData: PatchUserInput) {
    return this.usersService.patchUser(patchUserData);
  }
}
