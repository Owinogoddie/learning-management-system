import { PrismaClient } from '@prisma/client';
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Engineering" },
        { name: "Filming" },
        { name: "Accounting" },
        { name: "Law" },
        { name: "Big Data" },
      ]
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}

main();
