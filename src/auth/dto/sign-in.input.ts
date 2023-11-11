import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field()
  @Length(8, 20)
  password: string;
}
