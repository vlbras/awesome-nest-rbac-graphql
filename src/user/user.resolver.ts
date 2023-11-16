import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/lib/models';
import {
  CreateUserInput,
  GetUserInput,
  GetUsersInput,
  UpdateUserInput,
} from './dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/lib/decorators';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/lib/guards';

@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(@Args('params') params: GetUsersInput): Promise<User[]> {
    return this.userService.findAll(params);
  }

  @Query(() => User)
  async user(@Args('where') where: GetUserInput): Promise<User> {
    return this.userService.findOne(where);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.userService.create(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('where') where: GetUserInput,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(where, data);
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteUser(@Args('where') where: GetUserInput): Promise<void> {
    return this.userService.delete(where);
  }
}
