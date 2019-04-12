import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(type => Int)
  @Field({ nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({
    length: 100,
    unique: true,
  })
  title: string;

  @Field({ nullable: false })
  @Column({ nullable: true })
  content: string;

  @Field({ nullable: false })
  @Column({ nullable: true })
  imageUrl: string;

  @Field({ nullable: false })
  @ManyToOne(type => User, { eager: true })
  @JoinColumn()
  author: User;

  @Field({ nullable: false })
  @CreateDateColumn()
  createAt: Date;

  @Field({ nullable: false })
  @UpdateDateColumn()
  updatedAt: Date;
}