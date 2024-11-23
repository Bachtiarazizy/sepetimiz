import ProductList from "@/components/products/product-list";
import Categories from "@/components/search/categories";
import SearchInput from "@/components/search/search-input";
import prisma from "@/lib/db";
import { Product, Category, Shop } from "@prisma/client";

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
    <>
      <div className="px-6 pt-6 ">
        <SearchInput />
      </div>
      <Categories items={categories} />
      <div className="px-6 overflow-y-scroll bg-secondary mx-0 md:mx-auto py-6 rounded-none md:h-[calc(100vh-170px)] md:rounded-none md:rounded-bl-3xl md:mt-1 md:rounded-tl-xl container">
        <ProductList products={products} />
      </div>
    </>
  );
};

export default SearchPage;
