import { IsOptional } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly token?: string;
}
