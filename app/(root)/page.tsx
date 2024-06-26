import Banner from "@/components/hyper-ui/Banner";
import Marketing from "@/components/hyper-ui/Marketing";
import Reviews from "@/components/hyper-ui/Review";
import { ProductRow } from "@/components/products/ProductRow";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Banner />
      <section className="w-full mx-auto px-4 md:px-8 mb-24 mt-20">
        <div className="max-w-4xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
          <h1>Check Out the Latest</h1>
          <h1 className="text-primary">Products and Services</h1>
          <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[95%] font-normal text-sm">
            Stay updated with our newest additions and explore the most recent innovations and offerings in the market. Be the first to discover what's new!
          </p>
        </div>
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <ProductRow category="newest" />
          <ProductRow category="fashion" />
          <ProductRow category="electronics" />
          <ProductRow category="food" />
        </div>
      </section>
      <Marketing />
      <Reviews />
    </main>
  );
}
