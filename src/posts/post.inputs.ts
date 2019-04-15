import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePostInput {
  @Field() title: string;
  @Field() content: string;
  @Field({ nullable: true }) imageUrl?: string;
}

@InputType()
export class PatchPostInput {
  @Field() id: number;
  @Field() title: string;
  @Field() content: string;
  @Field({ nullable: true }) imageUrl?: string;
}
