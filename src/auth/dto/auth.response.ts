import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field()
  readonly accessToken: string;

  @Field()
  readonly refreshToken: string;
}
