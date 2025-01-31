import prisma from "@/lib/db";
import ProductCard from "@/components/products/product-card";
import SearchBar from "@/components/search/search-bar"; // Import the new SearchBar

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Fetch categories for the SearchBar
  const categories = await prisma.category.findMany({
    orderBy: {
      title: "asc",
    },
  });

  const query = searchParams.q?.trim();
  const category = searchParams.category;

  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      shop: {
        isPublished: true,
      },
      AND: [
        // Category filter
        category && category !== "all"
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
  const pageTitle = category && query && category !== "all" ? `${category} - "${query}"` : category && category !== "all" ? category : query ? `Search: ${query}` : "All Products";

  const pageDescription =
    category && query && category !== "all"
      ? `Search results for "${query}" in ${category.toLowerCase()}`
      : category && category !== "all"
      ? `Browse our collection of ${category.toLowerCase()} products`
      : query
      ? `Search results for "${query}"`
      : "Explore our latest product offerings";

  return (
    <div className="py-8 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Add SearchBar with categories */}
        <SearchBar categories={categories} />

        <div className="mt-8 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{pageTitle}</h1>
          <p className="text-muted-foreground mt-2">{pageDescription}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
