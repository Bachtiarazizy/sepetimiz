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

// Helper function for retrying database operations
async function withRetry<T>(operation: () => Promise<T>, retries = 3, interval = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Operation failed (attempt ${i + 1}/${retries}):`, error);
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
  throw new Error("All retry attempts failed");
}

export default async function ProductsPageServer({ params }: ProductsPageProps) {
  try {
    const products = await withRetry(() =>
      prisma.product.findMany({
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
      })
    );

    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-muted-foreground" />
              <Heading title={`Products (${products.length})`} description="Manage your product inventory and listings" />
            </div>
          </div>
        </div>
        <Separator />
        <ProductsPage products={products} shopId={params.shopId} />
      </div>
    );
  } catch (error) {
    console.error("Error in ProductsPageServer:", error);
    throw error;
  }
}
