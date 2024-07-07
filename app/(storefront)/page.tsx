import Banner from "@/components/hyper-ui/Banner";
import Marketing from "@/components/hyper-ui/Marketing";
import Reviews from "@/components/hyper-ui/Review";
import ProductResults from "@/components/products/ProductResult";
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
    <main className="flex min-h-screen flex-col items-center justify-between w-full gap-y-5 sm:gap-y-8 lg:gap-y-10">
      <Banner />
      <section className="w-full mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
          <h1>Check Out the Latest</h1>
          <h1 className="text-primary">Products and Services</h1>
          <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[95%] font-normal text-sm">
            Stay updated with our newest additions and explore the most recent innovations and offerings in the market. Be the first to discover what's new!
          </p>
        </div>

        <section className="flex flex-col mt-10 gap-10">
          <ProductFilterSidebar defaultValues={filterValues} />

          <ProductResults filterValues={filterValues} page={page ? parseInt(page) : undefined} />
        </section>
      </section>
      <Marketing />
      <Reviews />
    </main>
  );
}
