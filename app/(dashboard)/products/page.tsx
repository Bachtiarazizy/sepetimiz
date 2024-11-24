// app/(dashboard)/shops/[shopId]/products/page.tsx

import prisma from "@/lib/db";
import ProductsPage from "./_components/product-page";

interface ProductsPageProps {
  params: {
    shopId: string;
  };
}

export default async function ProductsPageServer({ params }: ProductsPageProps) {
  const products = await prisma.product.findMany({
    where: {
      shopId: params.shopId,
    },
    include: {
      category: {
        select: {
          title: true,
        },
      },
    },
  });

  return <ProductsPage products={products} shopId={params.shopId} />;
}
