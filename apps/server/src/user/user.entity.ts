import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  firstName!: string;

  @Field()
  @Property()
  lastName!: string;

  // @Field(() => [Post], { nullable: true })
  // @OneToMany(
  //   () => Post,
  //   post => post.user,
  //   { nullable: true },
  // )
  // posts? = new Collection<Post>(this);

  @Field()
  @Property({ unique: true })
  email!: string;

  @Field()
  @Property({ unique: true })
  username!: string;

  @Property()
  password!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  age?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  born?: Date;

  @Field(() => Date)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => Date)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
}
