"use client";

import { Product } from "@prisma/client";
import { columns } from "../../shops/[shopId]/products/_components/column";
import { DataTable } from "../../shops/[shopId]/products/_components/data-table";

// Define ExtendedProduct interface
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
  const productColumns = columns({ shopId });

  return (
    <div>
      <DataTable data={products} columns={productColumns} shopId={shopId} />
    </div>
  );
}
