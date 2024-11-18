import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { DataTable } from "../_components/data-table";
import { columns } from "../_components/column";

interface PageProps {
  params: {
    shopId: string;
    productId: string;
  };
}

const ProductsPage = async ({ params }: PageProps) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const products = await prisma.product.findMany({
    where: {
      shopId: params.shopId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="p-6 md:p-12 bg-secondary/50 text-secondary-foreground min-h-[calc(100vh-80px)] md:rounded-tl-3xl">
        <div className="flex flex-col mb-8 gap-2">
          <h1 className="text-4xl font-bold">Your Products</h1>
          <p className="text-muted-foreground">Here is list of all your products</p>
        </div>
        <DataTable columns={columns} data={products} shopId={params.shopId} />
      </div>
    </>
  );
};

export default ProductsPage;
