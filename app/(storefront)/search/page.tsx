import React from "react";
import ProductList from "@/components/products/product-list";
import Categories from "@/components/search/categories";
import SearchInput from "@/components/search/search-input";
import prisma from "@/lib/db";
import { Product, Category, Shop } from "@prisma/client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SearchPageProps {
  searchParams: {
    title?: string;
    categoryId?: string;
  };
}

type ProductWithRelations = Product & {
  category: Category | null;
  shop: Shop;
};

async function getProducts(params: { title?: string; categoryId?: string }): Promise<ProductWithRelations[]> {
  try {
    const { title, categoryId } = params;
    const searchQuery = title?.trim();

    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        ...(searchQuery && {
          OR: [{ title: { contains: searchQuery, mode: "insensitive" } }, { description: { contains: searchQuery, mode: "insensitive" } }],
        }),
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
        shop: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return [];
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: {
        title: "asc",
      },
    }),
    getProducts(searchParams),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6 space-y-4">
          <div className="backdrop-blur-sm bg-background/80 rounded-lg p-4 shadow-sm">
            <SearchInput />
          </div>

          {/* Categories Section */}
          <div className="bg-background/50 rounded-lg p-2">
            <Categories items={categories} />
          </div>
        </div>

        {/* Products Grid Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className={cn("bg-secondary rounded-lg shadow-lg", "min-h-[calc(100vh-12rem)]", "transition-all duration-300 ease-in-out", "overflow-hidden")}>
            <div className="p-6">
              <div className="grid gap-6">
                <ProductList products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
