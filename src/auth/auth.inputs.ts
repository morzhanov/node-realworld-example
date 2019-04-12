import { InputType, Field } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field() password: string;
  @Field() email: string;
}

@InputType()
export class RegistrationInput {
  @Field() password: string;
  @Field() email: string;
  @Field() name: string;
}
