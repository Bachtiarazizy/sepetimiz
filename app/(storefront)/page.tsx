import { MarqueeDemo } from "@/components/Animation/Marquee";
import Reviews from "@/components/Animation/Reviews";
import Banner from "@/components/hyper-ui/Banner";
import Marketing from "@/components/hyper-ui/Marketing";
import ProductResults from "@/components/products/ProductResult";
import { ProductRow } from "@/components/products/ProductRow";
import ProductFilterSidebar from "@/components/shared/ProductFilterSidebar";
import { ProductFilterValues } from "@/lib/zodSchemas";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    category?: string;
    location?: string;
    page?: string;
  };
}

const validCategories = ["fashion", "electronics", "food", "others", "exchanges", "baggages"] as const;

function getTitle({ q, category, location }: ProductFilterValues) {
  const titlePrefix = q ? `${q} Products` : category;
  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({ searchParams: { q, location, category } }: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      category: validCategories.includes(category as any) ? (category as any) : undefined,
      location,
    })} `,
  };
}

export default function Home({ searchParams: { q, category, location, page } }: PageProps) {
  const filterValues: ProductFilterValues = {
    q,
    category: validCategories.includes(category as any) ? (category as any) : undefined,
    location,
  };

  return (
    <main className="flex min-h-screen flex-col w-full ">
      <Banner />
      <MarqueeDemo />
      <section className="px-8 sm:px-8 md:px-20 lg:px-32  ">
        <ProductRow category="newest" />
      </section>
      <section id="products" className="flex mt-12 flex-col gap-8 px-8 sm:px-8 md:px-20 lg:px-32">
        <ProductFilterSidebar defaultValues={filterValues} />
        <ProductResults filterValues={filterValues} page={page ? parseInt(page) : undefined} />
      </section>
      <section className="px-8 sm:px-8 md:px-20 lg:px-32  mt-20">
        <Reviews />
        <Marketing />
      </section>
    </main>
  );
}
