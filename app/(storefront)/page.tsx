import Categories from "@/components/Categories";
import Banner from "@/components/hyper-ui/Banner";
import Marketing from "@/components/hyper-ui/Marketing";
import Reviews from "@/components/hyper-ui/Review";
import ProductResults from "@/components/products/ProductResult";
import SelectCategories from "@/components/products/SelectCategories";
import ProductFilterSidebar from "@/components/shared/ProductFilterSidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProductFilterValues } from "@/lib/zodSchemas";
import { ListFilter, Search } from "lucide-react";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    location?: string;
    page?: string;
  };
}

function getTitle({ q, location }: ProductFilterValues) {
  const namePrefix = q ? `${q} products` : "All products";
  const nameSuffix = location ? ` in ${location}` : "";
  return `${namePrefix}${nameSuffix}`;
}

export function generateMetadata({ searchParams: { q, location } }: PageProps): Metadata {
  return {
    title: `${getTitle({ q, location })} `,
  };
}

export default function Home({ searchParams: { q, location, page } }: PageProps) {
  const filterValues: ProductFilterValues = {
    q,
    location,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full gap-y-3 sm:gap-y-8 lg:gap-y-10">
      <Banner />
      <section className="w-full mx-auto flex flex-col mt-5 ">
        <div className="flex items-center md:flex-row flex-col py-4">
          <Categories />
          <ProductFilterSidebar defaultValues={filterValues} />
        </div>
        <div className="mt-8">
          <ProductResults filterValues={filterValues} page={page ? parseInt(page) : undefined} />
        </div>
      </section>
      <Marketing />
      <Reviews />
    </main>
  );
}
