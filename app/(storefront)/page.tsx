import { MarqueeDemo } from "@/components/storefront/Animation/Marquee";
import Reviews from "@/components/storefront/Animation/Reviews";
import Banner from "@/components/storefront/hyper-ui/Banner";
import Marketing from "@/components/storefront/hyper-ui/Marketing";
import { Metadata } from "next";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full ">
      <Banner />
      <MarqueeDemo />
      <section className="px-8 sm:px-8 md:px-20 lg:px-32  ">{/* <ProductRow category="newest" /> */}</section>
      <section id="products" className="flex mt-12 flex-col gap-8 px-8 sm:px-8 md:px-20 lg:px-32"></section>
      <section className="px-8 sm:px-8 md:px-20 lg:px-32  mt-20">
        <Reviews />
        <Marketing />
      </section>
    </main>
  );
}
