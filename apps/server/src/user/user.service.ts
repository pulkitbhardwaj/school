import { EntityManager } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';

import { v4 as createToken } from 'uuid';
import { hash, verify } from 'argon2';

import { EmailService } from 'src/misc/email.service';
import { UserInputError } from 'apollo-server-express';
import {
  SignUpUserInput,
  UpdateUserInput,
  DeleteUserInput,
  SignInUserInput,
  ChangePasswordInput,
} from './user.input';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    private readonly emailService: EmailService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext('User Service');
  }

  /**
   * Find one User
   * @param user user
   */
  async findOne(user: { id?: number; email?: string; username?: string }) {
    return await this.em.findOne(User, { ...user });
  }

  /**
   * Get All Users
   */
  async findAll() {
    return await this.em.find(User, {});
  }

  /**
   * Sign Up User
   * @param user user
   */
  async signUp({
    firstName,
    lastName,
    email,
    password,
    username,
    age,
    born,
  }: SignUpUserInput): Promise<User | undefined> {
    this.logger.debug('Signing Up User...');

    const passwordHash = await hash(password);

    if (!passwordHash) {
      this.logger.error('Could not hash password');
      return undefined;
    }

    const user = this.em.create(User, {
      firstName,
      lastName,
      email,
      username,
      password: passwordHash,
      age,
      born,
    });

    if (!user) {
      this.logger.error('User not Created');

      return undefined;
    }

    await this.em.persistAndFlush(user);

    this.logger.log('User Signed Up');

    return user;
  }

  /**
   * Update User
   * @param user user
   */
  async update({
    id,
    firstName,
    lastName,
    email,
    username,
    age,
    born,
  }: UpdateUserInput): Promise<User | undefined> {
    this.logger.debug('Updating User...');

    const user = await this.em.findOne(User, { id });

    if (!user) {
      this.logger.error('User does not exist');
      return undefined;
    }

    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (email) {
      user.email = email;
    }

    if (username) {
      user.username = username;
    }

    user.age = age;
    user.born = born;

    await this.em.persistAndFlush(user);

    this.logger.log('User updated');

    return user;
  }

  /**
   * Delete User
   * @param user user
   */
  async delete({ id }: DeleteUserInput): Promise<boolean> {
    this.logger.debug('Deleting User...');

    const user = await this.em.findOne(User, { id });

    if (!user) {
      this.logger.error('User does not exist');
      return false;
    }

    await this.em.removeAndFlush(user);

    this.logger.log('User deleted');

    return true;
  }

  /**
   * Sign In User
   * @param user user
   */
  async signIn({ email, password }: SignInUserInput) {
    this.logger.debug('Signing In User...');

    const user = await this.em.findOne(User, { email });

    if (!user) {
      this.logger.error('Invalid Email');
      return undefined;
    }

    const valid = await verify(user.password, password);

    if (!valid) {
      this.logger.error('Invalid Password');
      return undefined;
    }

    this.logger.log('User Signed In');

    return user;
  }

  async changePassword({ token, password }: ChangePasswordInput) {
    // const user = await this.em.findOne(User, { id: parseInt(id) });
    // if (!user) {
    //   throw new Error('bad token');
    // }
    // user.password = await hash(password);
    // await this.em.persistAndFlush(user);
    // console.log('password changed yaay');
    // if (req.session) {
    //   req.session.userID = user.id;
    //   console.log('session created yaaay');
    // }
    // return true;
  }

  async forgotPassword(email: string) {
    this.logger.debug('Forgot Password...');

    const user = await this.em.findOne(User, { email });

    if (!user) {
      this.logger.error('Invalid email');
      throw new UserInputError('invalid email');
    }

    const token = createToken();

    await this.emailService.send({
      to: email,
      html: `<a href="http://localhost:3000/user/password/${token}">Reset Password</a>`,
    });

    console.log('email sent yay');

    return true;
  }
}
