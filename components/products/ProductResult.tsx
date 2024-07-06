import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import { ProductFilterValues } from "@/lib/zodSchemas";
import { Prisma } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductListItem from "./ProductListItem";

interface ProductResultsProps {
  filterValues: ProductFilterValues;
  page?: number;
}

export default async function ProductResults({ filterValues, page = 1 }: ProductResultsProps) {
  const { q, location } = filterValues;

  const productsPerPage = 6;
  const skip = (page - 1) * productsPerPage;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" ");

  const searchFilter: Prisma.ProductWhereInput = searchString
    ? {
        OR: [{ name: { contains: searchString, mode: "insensitive" } }, { location: { contains: searchString, mode: "insensitive" } }],
      }
    : {};

  const where: Prisma.ProductWhereInput = {
    AND: [searchFilter, location ? { location } : {}, { status: "published" }],
  };

  const productsPromise = prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: productsPerPage,
    skip,
  });

  const countPromise = prisma.product.count({ where });

  const [products, totalResults] = await Promise.all([productsPromise, countPromise]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductListItem product={product} />
      ))}
      {products.length === 0 && <p className="m-auto text-center">No products found. Try adjusting your search filters.</p>}
      {products.length > 0 && <Pagination currentPage={page} totalPages={Math.ceil(totalResults / productsPerPage)} filterValues={filterValues} />}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: ProductFilterValues;
}

function Pagination({ currentPage, totalPages, filterValues: { q, location } }: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(location && { location }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link href={generatePageLink(currentPage - 1)} className={cn("flex items-center gap-2 font-semibold", currentPage <= 1 && "invisible")}>
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link href={generatePageLink(currentPage + 1)} className={cn("flex items-center gap-2 font-semibold", currentPage >= totalPages && "invisible")}>
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
