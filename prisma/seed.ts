import { PrismaClient } from '@prisma/client';
import { createUsers } from './seeds/user.seed';

const prisma = new PrismaClient();

async function main() {
  const users = await createUsers();
  
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
  console.log(`Created ${users.length} users`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });