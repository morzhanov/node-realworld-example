import { Field, InputType } from 'type-graphql';

@InputType()
export class PatchUserInput {
  @Field() name: string;
  @Field() email: string;
}
