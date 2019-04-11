import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';

@Module({
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
