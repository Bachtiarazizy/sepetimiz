// utils/products.ts

import prisma from "@/lib/db";

// Define a type for the category field based on your Prisma schema
type CategoryTypes = "fashion" | "electronics" | "food" | "exchanges" | "baggages" | "others";

export interface ProductData {
  id: string; // Since your Prisma schema defines id as String
  name: string;
  price: string; // Keeping price as string as per your requirement
  description: string;
  images: string[];
  category: CategoryTypes;
  location?: string; // Make location optional if it's not always present
}

export async function fetchProducts(category?: string): Promise<ProductData[]> {
  if (!category) {
    const data = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        images: true,
        category: true,
        location: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    // Convert the returned objects to match ProductData interface
    return data.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      images: product.images,
      category: product.category as CategoryTypes, // Ensure category is of type CategoryTypes
      location: product.location,
    }));
  }

  const data = await prisma.product.findMany({
    where: {
      category: category as CategoryTypes, // Ensure category is of type CategoryTypes
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      images: true,
      location: true,
      category: true,
    },
    take: 4,
  });

  // Convert the returned objects to match ProductData interface
  return data.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    images: product.images,
    category: product.category as CategoryTypes, // Ensure category is of type CategoryTypes
    location: product.location,
  }));
}
