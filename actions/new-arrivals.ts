import prisma from "@/lib/db";

export async function getNewArrivals(limit: number = 8) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        shop: {
          isPublished: true,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      include: {
        category: {
          select: {
            title: true,
          },
        },
        shop: {
          select: {
            id: true,
            title: true,
            isVerified: true,
          },
        },
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    throw error;
  }
}
