import { Field, InputType, Int } from '@nestjs/graphql';
import { GetUserInput } from './get-user.input';

@InputType()
export class WhereUserInput extends GetUserInput {
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class GetUsersInput {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => WhereUserInput, { nullable: true })
  where?: WhereUserInput;
}
