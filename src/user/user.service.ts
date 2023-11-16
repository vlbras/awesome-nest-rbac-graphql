import {
  BadRequestException,
  ConflictException,
  Inject,
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
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(params: GetUsersInput): Promise<User[]> {
    if (Object.keys(params).length !== 0) {
      return this.prisma.user.findMany(params);
    }

    const cachedUsers = await this.cacheManager.get<User[]>('users');
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.prisma.user.findMany();
    await this.cacheManager.set('users', users);
    return users;
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
      const user = await this.prisma.user.create({ data });
      await this.cacheManager.del('users');
      return user;
    } catch (error) {
      throw new ConflictException('User with this email already exists');
    }
  }

  async update(where: GetUserInput, data: UpdateUserInput): Promise<User> {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Please provide data to update');
    }

    await this.findOne(where);

    if (data.password) {
      data.password = await hash(data.password);
    }

    try {
      const user = await this.prisma.user.update({ where, data });
      await this.cacheManager.del('users');
      return user;
    } catch (error) {
      throw new ConflictException('User with this email already exists');
    }
  }

  async delete(where: GetUserInput): Promise<void> {
    await this.findOne(where);
    await this.prisma.user.delete({ where });
    await this.cacheManager.del('users');
  }
}
