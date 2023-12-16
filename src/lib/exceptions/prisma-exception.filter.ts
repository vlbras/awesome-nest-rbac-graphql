import {
  Catch,
  ArgumentsHost,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        const model = message.split('.prisma.')[1].split('.')[0];
        throw new ConflictException(`This ${model} already exists`);
      }
      case 'P2003': {
        const relation = message.split('_')[1].split('Id')[0];
        throw new NotFoundException(`The ${relation} not found`);
      }
      case 'P2025': {
        throw new NotFoundException(`Not found`);
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
