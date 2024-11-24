// app/(dashboard)/shops/[shopId]/products/page.tsx
import prisma from "@/lib/db";
import ProductsPage from "./_components/product-page";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Package } from "lucide-react";

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

  // Get total products count
  const totalProducts = await prisma.product.count({
    where: {
      shopId: params.shopId,
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-muted-foreground" />
            <Heading title={`Products (${totalProducts})`} description="Manage your product inventory and listings" />
          </div>
        </div>
      </div>
      <Separator />
      <ProductsPage products={products} shopId={params.shopId} />
    </div>
  );
}
