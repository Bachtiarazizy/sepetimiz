// app/search/page.tsx
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ProductCard from "@/components/products/product-card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim();
  const category = searchParams.category;

  // If no search query or category, redirect to products page
  if (!query && !category) {
    redirect("/products");
  }

  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      shop: {
        isPublished: true,
      },
      AND: [
        // Category filter
        category
          ? {
              category: {
                title: {
                  equals: category,
                  mode: "insensitive",
                },
              },
            }
          : {},
        // Search query filter
        query
          ? {
              OR: [
                {
                  title: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  shop: {
                    title: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {},
      ],
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

  // Generate appropriate page title and description
  const pageTitle = category && query ? `${category} - "${query}"` : category ? category : query ? `Search: ${query}` : "Search Results";

  const pageDescription = category && query ? `Search results for "${query}" in ${category.toLowerCase()}` : category ? `Browse our collection of ${category.toLowerCase()} products` : `Search results for "${query}"`;

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
              <p className="text-muted-foreground">No products found for your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
