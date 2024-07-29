import { MarqueeDemo } from "@/components/Animation/Marquee";
import Reviews from "@/components/Animation/Reviews";
import Categories from "@/components/Categories";
import Banner from "@/components/hyper-ui/Banner";
import Marketing from "@/components/hyper-ui/Marketing";
import { MarqueeDemoVertical } from "@/components/hyper-ui/Review";
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
    <main className="flex min-h-screen flex-col w-full ">
      <Banner />
      <MarqueeDemo />
      <section className="px-8 sm:px-8 md:px-20 lg:px-32  ">
        <ProductRow category="newest" />
      </section>
      <section className="px-8 sm:px-8 md:px-20 lg:px-32  mt-20">
        <Reviews />
        <Marketing />
      </section>
    </main>
  );
}
