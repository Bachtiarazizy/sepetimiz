import { Shop } from "@prisma/client";

import prisma from "@/lib/db";

type GetShop = {
  userId: string;
  name?: string;
  images?: string;
  location?: string;
  description?: string;
};

export const getShops = async ({ userId, name, images, location, description }: GetShop) => {
  try {
    const where: any = {
      isPublished: true,
      userId: userId,
    };

    if (name) {
      where.name = { contains: name };
    }
    if (images) {
      where.images = { contains: images };
    }
    if (location) {
      where.location = { contains: location };
    }
    if (description) {
      where.description = { contains: description };
    }

    const shops = await prisma.shop.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return shops;
  } catch (error) {
    console.log("[GET_SHOPS]", error);
    return [];
  }
};
