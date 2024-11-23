import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [{ name: "Electronics" }, { name: "Fashions" }, { name: "Baggages" }, { name: "Exchanges" }, { name: "Foods" }, { name: "Others" }];

async function main() {
  console.log("Seeding categories...");

  for (const category of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { name: category.name },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
      console.log(`Category ${category.name} created.`);
    } else {
      console.log(`Category ${category.name} already exists.`);
    }
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
