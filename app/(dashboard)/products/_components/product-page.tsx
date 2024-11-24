"use client";

import { Product } from "@prisma/client";
import { DataTable } from "../../shops/[shopId]/products/_components/data-table";
import { columns } from "../../shops/[shopId]/products/_components/column";

// Import atau definisikan ExtendedProduct interface
interface ExtendedProduct extends Product {
  category: {
    title: string;
  } | null;
}

interface ProductsPageProps {
  products: ExtendedProduct[];
  shopId: string;
}

export default function ProductsPage({ products, shopId }: ProductsPageProps) {
  // Pass shopId to columns function to generate the columns configuration
  const productColumns = columns({ shopId });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DataTable data={products} columns={productColumns} shopId={shopId} />
      </div>
    </div>
  );
}
