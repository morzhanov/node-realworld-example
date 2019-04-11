import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => Int)
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  email: string;
}
