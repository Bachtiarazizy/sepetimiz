import Banner from "@/components/hyper-ui/Banner";
import Marketing from "@/components/hyper-ui/Marketing";
import Reviews from "@/components/hyper-ui/Review";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import JobFilterSidebar from "@/components/shared/JobFilterSidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ListFilter, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full gap-y-5 sm:gap-y-8 lg:gap-y-10">
      <Banner />
      <section className="w-full mx-auto px-4 md:px-8 ">
        <div className="max-w-4xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
          <h1>Check Out the Latest</h1>
          <h1 className="text-primary">Products and Services</h1>
          <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[95%] font-normal text-sm">
            Stay updated with our newest additions and explore the most recent innovations and offerings in the market. Be the first to discover what's new!
          </p>
        </div>

        <section className="flex flex-col md:flex-row gap-4">
          <JobFilterSidebar />
          <div className="mx-auto max-w-screen-2xl space-y-4 grow px-4 py-6 sm:px-6 lg:px-8">
            <FeaturedProducts />
          </div>
        </section>
      </section>
      <Marketing />
      <Reviews />
    </main>
  );
}
