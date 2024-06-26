import ProductsTable from "@/components/products/ProductsTable";
import Tables from "@/components/products/Table";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function myProductsPage() {
  return (
    <>
      <div className="flex flex-col justify-between items-center my-6 gap-3  px-10 ">
        <h1 className="text-3xl font-bold">My Products</h1>
        <Tables />
      </div>
    </>
  );
}
