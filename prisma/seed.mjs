import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [{ title: "Electronics" }, { title: "Fashions" }, { title: "Baggages" }, { title: "Exchanges" }, { title: "Foods" }, { title: "Others" }];

async function main() {
  console.log("Seeding categories...");

  for (const category of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { title: category.title },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
      console.log(`Category ${category.title} created.`);
    } else {
      console.log(`Category ${category.title} already exists.`);
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
