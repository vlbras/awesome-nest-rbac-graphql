import {
  Field,
  HideField,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Base } from './base.model';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class User extends Base {
  @Field()
  email: string;

  @Field(() => Role)
  role: Role;

  @HideField()
  password: string;

  @HideField()
  token?: string;
}
