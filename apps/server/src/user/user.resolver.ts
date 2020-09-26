import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from './user.decorator';
import { User } from './user.entity';
import {
  SignUpUserInput,
  UpdateUserInput,
  DeleteUserInput,
  SignInUserInput,
  ChangePasswordInput,
} from './user.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(GQLAuthGuard)
  @Query(() => User, { nullable: true })
  async me(@CurrentUser() { id }: User) {
    return await this.userService.findOne({ id });
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: number) {
    return await this.userService.findOne({ id });
  }

  @Query(() => [User], { nullable: true })
  async allUsers() {
    return await this.userService.findAll();
  }

  @Mutation(() => User, { nullable: true })
  async signupUser(
    @Args('user')
    user: SignUpUserInput,
  ): Promise<User | undefined> {
    return await this.userService.signUp(user);
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Args('user')
    user: UpdateUserInput,
  ): Promise<User | undefined> {
    return await this.userService.update(user);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('user') user: DeleteUserInput): Promise<boolean> {
    return await this.userService.delete(user);
  }

  @Mutation(() => User, { nullable: true })
  async signinUser(@Args('user') user: SignInUserInput) {
    return await this.userService.signIn(user);
  }

  @Mutation(() => Boolean)
  async changePassword(@Args('options') options: ChangePasswordInput) {
    return await this.userService.changePassword(options);
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Args('email') email: string) {
    return await this.userService.forgotPassword(email);
  }
}
