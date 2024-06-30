import Banner from "@/components/hyper-ui/Banner";
import Marketing from "@/components/hyper-ui/Marketing";
import Reviews from "@/components/hyper-ui/Review";
import { ProductRow } from "@/components/products/ProductRow";
import Collection from "@/components/shared/Collections";
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
        <div className="w-full flex items-center justify-between mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8 flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Available</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Not Available</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
          {/* <Collection data={[]} emptyTitle="No Products Found" emptyStateSubtext="Try adjusting your search or filter to find what you're looking for." collectionType="All_Products" limit={6} page={1} totalPages={2} /> */}
          {/* <ProductRow category="newest" /> */}
          <ProductRow />
          {/* <ProductRow category="electronics" />
          <ProductRow category="food" /> */}
        </div>
      </section>
      <Marketing />
      <Reviews />
    </main>
  );
}
