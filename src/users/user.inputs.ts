import { Field, InputType } from 'type-graphql';

@InputType()
export class PatchUserInput {
  @Field() id: number;
  @Field() name: string;
  @Field() email: string;
}
