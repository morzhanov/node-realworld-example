import { Field, Int, ObjectType } from 'type-graphql';
import { User } from '../users/user.entity';

@ObjectType()
export class Post {
  @Field(type => Int)
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  content: string;

  @Field({ nullable: false })
  imageUrl: string;

  @Field({ nullable: false })
  author: User;

  // @CreateDateColumn()
  @Field({ nullable: false })
  createAt: Date;

  // @UpdateDateColumn()
  @Field({ nullable: false })
  updatedAt: Date;
}
