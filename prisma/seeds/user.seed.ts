import { Prisma } from '@prisma/client';
import { hash } from 'argon2';

export const createUsers = async () => {
  const users: Prisma.UserUpsertArgs['create'][] = [
    {
      id: '9e391faf-64b2-4d4c-b879-463532920fd1',
      email: 'default-admin@vlbras.com',
      password: await hash(process.env.DEFAULT_ADMIN_PASSWORD),
      role: 'ADMIN',
    },
    {
      id: '9e391faf-64b2-4d4c-b879-463532920fd2',
      email: 'default-customer@vlbras.com',
      password: await hash(process.env.DEFAULT_CUSTOMER_PASSWORD),
    },
  ];

  return users;
};
