import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field()
  @Length(8, 20)
  password: string;

  @IsOptional()
  @Field(() => Role, { nullable: true })
  role?: Role;
}
