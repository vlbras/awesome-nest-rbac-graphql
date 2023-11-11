import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
