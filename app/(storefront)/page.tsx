import { MarqueeDemo } from "@/components/Animation/Marquee";
import Reviews from "@/components/Animation/Reviews";
import Banner from "@/components/hyper-ui/Banner";
import Marketing from "@/components/hyper-ui/Marketing";
import { ProductRow } from "@/components/products/ProductRow";

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
