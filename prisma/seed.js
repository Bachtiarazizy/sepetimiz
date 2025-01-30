import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [{ title: "Electronics" }, { title: "Fashions" }, { title: "Baggages" }, { title: "Exchanges" }, { title: "Foods" }, { title: "Services" }, { title: "Others" }];

  console.log("Start seeding categories...");

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
      },
    });
    console.log(`Created category: ${createdCategory.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
