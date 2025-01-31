import prisma from "@/lib/db";

interface GetProductsProps {
  userId?: string;
  title?: string;
  categoryId?: string;
}

export const getProduct = async ({ userId, title, categoryId }: GetProductsProps) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        ...(userId && { shop: { userId } }),
        isPublished: true,
        ...(title && {
          OR: [{ title: { contains: title, mode: "insensitive" } }, { description: { contains: title, mode: "insensitive" } }],
        }),
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
        shop: {
          select: {
            id: true,
            title: true,
            isVerified: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("[GET_PRODUCTS]", error);
    return [];
  }
};
