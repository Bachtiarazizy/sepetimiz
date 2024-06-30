// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await prisma.product.findMany({
      select: {
        price: true,
        name: true,
        description: true,
        id: true,
        images: true,
        category: true,
        createdAt: true,
      },
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
}
