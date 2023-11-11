import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class GetUserInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  @IsUUID()
  id?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;
}
