// app/shop/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getShopData } from "@/actions/actions";
import { ProductCard } from "@/components/products/ProductCard";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const shopData = await getShopData(params.id);
  return {
    title: shopData.name,
  };
}

export default async function ShopIdPage({ params }: { params: { id: string } }) {
  const shopData = await getShopData(params.id).catch(() => notFound());

  if (!shopData) {
    return notFound();
  }

  return (
    <div className="py-8 px-4 md:px-32">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight ">{shopData.name}</h1>
        <p className="mt-2 ">{shopData.description}</p>
        <p className="mt-2 ">
          <strong>Location:</strong> {shopData.location}
        </p>
        <p className="mt-2 ">
          <strong>Owner:</strong> {shopData.owner.firstName} {shopData.owner.lastName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start border-t border-gray-200 mt-10 py-10">
        {shopData.products.length > 0 ? (
          shopData.products.map((product) => <ProductCard key={product.id} images={product.images} id={product.id} price={product.price} name={product.name} location={product.location} currency={product.currency} />)
        ) : (
          <div className="col-span-full">
            <p className="text-center text-gray-500">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
}
