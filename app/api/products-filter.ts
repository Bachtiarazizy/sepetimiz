// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, CategoryTypes } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, sortBy } = req.query;

  // Type conversion for category
  const categoryType = category ? (category.toString().toUpperCase() as CategoryTypes) : undefined;

  try {
    const products = await prisma.product.findMany({
      where: {
        category: categoryType,
      },
      // Add sorting based on sortBy if provided
      orderBy: {
        createdAt: sortBy === "NEWEST" ? "desc" : undefined, // Example sorting by createdAt in descending order for newest
        // Add more orderBy conditions as needed
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
}
