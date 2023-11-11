import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateUserInput,
  GetUserInput,
  GetUsersInput,
  UpdateUserInput,
} from './dto';
import { User } from 'src/lib/models';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: GetUsersInput): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }

  async findOne(where: GetUserInput): Promise<User> {
    if (Object.keys(where).length === 0) {
      throw new BadRequestException('Please provide id or email');
    }

    const user = await this.prisma.user.findUnique({ where });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(data: CreateUserInput): Promise<User> {
    try {
      data.password = await hash(data.password);
      return this.prisma.user.create({ data });
    } catch (error) {
      throw new ConflictException('User with this email already exists');
    }
  }

  async update(where: GetUserInput, data: UpdateUserInput): Promise<User> {
    await this.findOne(where);

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Please provide data to update');
    }

    if (data.password) {
      data.password = await hash(data.password);
    }

    try {
      return this.prisma.user.update({ where, data });
    } catch (error) {
      throw new ConflictException('User with this email already exists');
    }
  }

  async delete(where: GetUserInput): Promise<User> {
    await this.findOne(where);
    return this.prisma.user.delete({ where });
  }
}
