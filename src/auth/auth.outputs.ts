import { ObjectType, Field } from 'type-graphql';
import { User } from '../users/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;
}

@ObjectType()
export class RegistrationResponse {
  @Field()
  token: string;

  @Field()
  user: User;
}
