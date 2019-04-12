import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(type => Int)
  @Field({ nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ nullable: false })
  name: string;

  @Field({ nullable: false })
  @Column({ nullable: false, unique: true })
  email: string;

  @Field({ nullable: false })
  @CreateDateColumn()
  createAt: Date;

  @Field({ nullable: false })
  @UpdateDateColumn()
  updatedAt: Date;
}
