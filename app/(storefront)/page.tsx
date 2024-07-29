import Marquees from "@/components/Animation/Marquee";
import Categories from "@/components/Categories";
import Banner from "@/components/hyper-ui/Banner";
import Marketing from "@/components/hyper-ui/Marketing";
import Reviews from "@/components/hyper-ui/Review";
import ProductResults from "@/components/products/ProductResult";
import { ProductRow } from "@/components/products/ProductRow";

import SelectCategories from "@/components/products/SelectCategories";
import ProductFilterSidebar from "@/components/shared/ProductFilterSidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProductFilterValues } from "@/lib/zodSchemas";
import { ListFilter, Search } from "lucide-react";
import { Metadata } from "next";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full gap-y-3 sm:gap-y-8 lg:gap-y-10">
      <Banner />
      <Marquees />
      <section className="px-20">
        <ProductRow category="newest" />
        <Marketing />
      </section>
      <Reviews />
    </main>
  );
}
