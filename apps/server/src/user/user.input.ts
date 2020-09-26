import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class SignUpUserInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  born?: Date;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id!: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  age?: number;

  @Field({ nullable: true })
  born?: Date;
}

@InputType()
export class DeleteUserInput {
  @Field(() => ID)
  id!: number;
}

@InputType()
export class SignInUserInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  token: string;

  @Field()
  password: string;
}
