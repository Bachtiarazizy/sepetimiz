"use client";

import prisma from "@/lib/db";
import ProductCard from "@/components/products/product-card";

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category;

  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      shop: {
        isPublished: true,
      },
      // Only apply category filter if category is provided
      ...(category && {
        category: {
          title: {
            equals: category,
            mode: "insensitive",
          },
        },
      }),
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  const pageTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products";

  const pageDescription = category ? `Browse our collection of ${category.toLowerCase()} products` : "Browse our complete collection of products";

  return (
    <div className="py-8 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{pageTitle}</h1>
          <p className="text-muted-foreground mt-2">{pageDescription}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">{category ? "No products found in this category." : "No products available at the moment."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
