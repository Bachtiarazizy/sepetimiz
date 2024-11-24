// lib/db.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // This must be a `var` and not a `let / const`
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query", "error", "warn"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Handling connection errors
prisma
  .$connect()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((e) => {
    console.error("Failed to connect to database:", e);
  });

// Handling graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
