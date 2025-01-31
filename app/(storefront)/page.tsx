import { getNewArrivals } from "@/actions/new-arrivals";
import CategorySection from "@/components/category-section";
import NewArrivals from "@/components/products/new-arrival-section";
import MarqueeDemo from "@/components/storefront/Animation/Marquee";
import Banner from "@/components/storefront/hyper-ui/Banner";
import JoinAsSeller from "@/components/storefront/join-as-seller";
import Testimonials from "@/components/storefront/testimonials";
import ValueProposition from "@/components/storefront/value-proposition";

export default async function Home() {
  const newArrivals = await getNewArrivals(8);
  return (
    <>
      <main className="flex min-h-screen flex-col w-full ">
        <Banner />
        <CategorySection />
        <NewArrivals products={newArrivals} />
        <MarqueeDemo />
        <ValueProposition />
        <Testimonials />
        <JoinAsSeller />
      </main>
    </>
  );
}
